# stress_detector.py
import cv2
import random
import time

# Store stress levels for plotting
stress_history = []

def detect_stress(duration=5):
    """
    Simulated stress detector using webcam input.
    Replace with real emotion model later.
    """
    cap = cv2.VideoCapture(0)
    start_time = time.time()
    print("[Stress Detector] Starting... Look at the camera.")

    while time.time() - start_time < duration:
        ret, frame = cap.read()
        if not ret:
            break

        # (Optional) Show video feed
        cv2.imshow('Stress Check', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    # Simulate stress level
    stress_level = random.randint(35, 75)
    print(f"[Stress Detector] Estimated Stress Level: {stress_level}")

    # Store in history for graph
    stress_history.append(stress_level)
    if len(stress_history) > 50:
        stress_history.pop(0)

    return stress_level

def get_stress_history():
    return stress_history
