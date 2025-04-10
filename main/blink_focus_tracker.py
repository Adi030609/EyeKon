import cv2
import time
import math
from mediapipe import solutions

blink_history = []

def get_blink_history():
    return blink_history

def euclidean_distance(p1, p2):
    return math.hypot(p1[0] - p2[0], p1[1] - p2[1])

def get_eye_aspect_ratio(landmarks, eye_indices, image_shape):
    h, w = image_shape
    points = [(int(landmarks[i].x * w), int(landmarks[i].y * h)) for i in eye_indices]
    vertical1 = euclidean_distance(points[1], points[5])
    vertical2 = euclidean_distance(points[2], points[4])
    horizontal = euclidean_distance(points[0], points[3])
    ear = (vertical1 + vertical2) / (2.0 * horizontal)
    return ear, points

def track_blink_focus(duration=5):
    mp_face_mesh = solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(refine_landmarks=True)
    cap = cv2.VideoCapture(0)

    LEFT_EYE = [33, 160, 158, 133, 153, 144]
    RIGHT_EYE = [263, 387, 385, 362, 380, 373]

    blink_count = 0
    closed_eyes_frame = 0
    EAR_THRESHOLD = 0.2
    CONSEC_FRAMES = 3

    start_time = time.time()

    while True:
        if time.time() - start_time > duration:
            break

        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = face_mesh.process(rgb_frame)

        if result.multi_face_landmarks:
            for face_landmarks in result.multi_face_landmarks:
                h, w, _ = frame.shape

                left_ear, left_points = get_eye_aspect_ratio(face_landmarks.landmark, LEFT_EYE, (h, w))
                right_ear, right_points = get_eye_aspect_ratio(face_landmarks.landmark, RIGHT_EYE, (h, w))
                avg_ear = (left_ear + right_ear) / 2.0

                for p in left_points + right_points:
                    cv2.circle(frame, p, 2, (0, 255, 0), -1)

                if avg_ear < EAR_THRESHOLD:
                    closed_eyes_frame += 1
                else:
                    if closed_eyes_frame >= CONSEC_FRAMES:
                        blink_count += 1
                        print("Blink detected!")
                    closed_eyes_frame = 0

        cv2.putText(frame, f"Blinks: {blink_count}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

        cv2.imshow("Blink Tracker", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    elapsed = max(1, time.time() - start_time)
    blink_rate_bpm = (blink_count / elapsed) * 60
    blink_history.append(min(blink_rate_bpm, 100))

    # For now, return dummy focus score as 100 - (blinks * 3)
    focus_score = max(0, 100 - blink_count * 3)

    return round(blink_rate_bpm, 2), round(focus_score, 2)
