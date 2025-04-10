# server.py

import cv2
import time
import base64
import threading
from flask import Flask
from flask_socketio import SocketIO, emit
import eventlet
from blink_focus_tracker import process_blink_frame
from fatigue_score import calculate_efs
from screentime import get_active_window_info
from screen_adjuster import auto_adjust_screen


eventlet.monkey_patch()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

video_thread = None
video_active = False

def encode_frame(frame):
    _, buffer = cv2.imencode('.jpg', frame)
    return base64.b64encode(buffer).decode('utf-8')

def stream_video():
    global video_active

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("❌ Failed to open webcam.")
        return

    print("✅ Webcam opened. Starting stream...")

    blink_data = {"count": 0, "start_time": time.time(), "closed_frames": 0}
    frame_count = 0
    desired_fps = 15
    frame_interval = 1.0 / desired_fps

    # Start screen adjuster thread
    def run_screen_adjuster():
        while video_active:
            elapsed = max(1, time.time() - blink_data["start_time"])
            blink_rate = (blink_data["count"] / elapsed) * 60
            focus_score = max(0, 100 - blink_data["count"] * 3)
            efs = calculate_efs(blink_rate, focus_score, stress_level=50)
            auto_adjust_screen(efs)
            time.sleep(10)

    threading.Thread(target=run_screen_adjuster, daemon=True).start()

    while video_active:
        loop_start = time.time()

        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        small_frame = cv2.resize(frame, (320, 240))

        try:
            process_blink_frame(small_frame, blink_data)
        except Exception as e:
            print(f"[Blink Detection Error] {e}")

        # Emit resized frame to frontend
        try:
            display_frame = cv2.resize(frame, (480, 360))
            image_data = encode_frame(display_frame)
            socketio.emit('video_frame', image_data)
        except Exception as e:
            print(f"[Frame Encoding Error] {e}")

        # Emit stats
        elapsed = max(1, time.time() - blink_data["start_time"])
        blink_rate = (blink_data["count"] / elapsed) * 60
        focus_score = max(0, 100 - blink_data["count"] * 3)
        efs = calculate_efs(blink_rate, focus_score, stress_level=50)

        socketio.emit('blink_stats', {
            'blinks': blink_data["count"],
            'blink_rate': round(blink_rate, 2),
            'focus_score': round(focus_score, 2),
            'efs': round(efs, 2)
        })

        # Maintain desired FPS
        elapsed_time = time.time() - loop_start
        sleep_time = max(0, frame_interval - elapsed_time)
        socketio.sleep(sleep_time)

    cap.release()
    print("📴 Stopped streaming.")


@app.route('/')
def index():
    return "🎥 VisionGuard AI backend is running."

@socketio.on('connect')
def on_connect():
    print("✅ Client connected.")

@socketio.on('disconnect')
def on_disconnect():
    global video_active
    print("❌ Client disconnected.")
    video_active = False

@socketio.on('start_video')
def handle_start_video():
    global video_thread, video_active
    if not video_active:
        print("📡 Starting video stream...")
        video_active = True

        video_thread = threading.Thread(target=stream_video)
        window_thread = threading.Thread(target=get_active_window_info, args=(lambda: video_active, socketio))

        video_thread.start()
        window_thread.start()

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)

