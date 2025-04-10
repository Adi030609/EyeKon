import cv2
import dlib
from imutils import face_utils

class EyeTracker:
    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor("models/shape_predictor_68_face_landmarks.dat")
        (self.leStart, self.leEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
        (self.reStart, self.reEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

    def detect_eyes(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.detector(gray)

        for face in faces:
            shape = self.predictor(gray, face)
            shape = face_utils.shape_to_np(shape)

            leftEye = shape[self.leStart:self.leEnd]
            rightEye = shape[self.reStart:self.reEnd]

            cv2.drawContours(frame, [cv2.convexHull(leftEye)], -1, (0, 255, 0), 2)
            cv2.drawContours(frame, [cv2.convexHull(rightEye)], -1, (0, 255, 0), 2)

        return frame
