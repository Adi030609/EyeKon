# blink_detector.py

import cv2
import dlib
import numpy as np
from scipy.spatial import distance

# Load once
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
EAR_THRESHOLD = 0.2
CONSEC_FRAMES = 3
LEFT_EYE_IDX = list(range(36, 42))
RIGHT_EYE_IDX = list(range(42, 48))

def shape_to_np(shape):
    return np.array([[p.x, p.y] for p in shape.parts()])

def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)

def process_blink_frame(frame, blink_data):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)

    for face in faces:
        shape = predictor(gray, face)
        shape_np = shape_to_np(shape)
        left_eye = shape_np[LEFT_EYE_IDX]
        right_eye = shape_np[RIGHT_EYE_IDX]

        left_ear = eye_aspect_ratio(left_eye)
        right_ear = eye_aspect_ratio(right_eye)
        avg_ear = (left_ear + right_ear) / 2.0

        if avg_ear < EAR_THRESHOLD:
            blink_data["closed_frames"] += 1
        else:
            if blink_data["closed_frames"] >= CONSEC_FRAMES:
                blink_data["count"] += 1
                print("😴 Blink detected!")
            blink_data["closed_frames"] = 0

    return blink_data
