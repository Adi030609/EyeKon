# screen_time_tracker.py

import win32gui
import win32process
import psutil
from datetime import datetime
import time

def get_active_window_info():
    window_handle = win32gui.GetForegroundWindow()
    window_title = win32gui.GetWindowText(window_handle)
    _, process_id = win32process.GetWindowThreadProcessId(window_handle)

    try:
        process_name = psutil.Process(process_id).name()
    except psutil.NoSuchProcess:
        process_name = "Unknown"

    return window_title, process_name


def track_active_window(video_active, socketio):
    previous_window = None
    start_time = None

    while video_active():
        window_title, process_name = get_active_window_info()

        if window_title != previous_window:
            if previous_window is not None:
                end_time = datetime.now()
                duration = (end_time - start_time).seconds

                socketio.emit('window_info', {
                    'title': previous_window,
                    'process': previous_process_name,
                    'start_time': start_time.strftime('%H:%M:%S'),
                    'end_time': end_time.strftime('%H:%M:%S'),
                    'duration': duration
                })

            previous_window = window_title
            previous_process_name = process_name
            start_time = datetime.now()

        # time.sleep(1)  # Use regular sleep since this runs in a separate thread
