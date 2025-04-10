import threading
import time
import os
from playsound import playsound

from blink_focus_tracker import track_blink_focus
from stress_detector import detect_stress
from screen_adjuster import auto_adjust_screen
from eye_exercises import suggest_eye_exercise
from visualizer import show_stress_graph

def calculate_efs(blink_rate, focus_score, stress_level):
    fatigue = (100 - (blink_rate * 20)) * 0.3 + (100 - focus_score) * 0.4 + stress_level * 0.3
    return round(min(100, max(0, fatigue)), 2)

def run_visionguard():
    print("\n Starting Eye-Kon AI Monitoring...\n")

    while True:
        print("\n Measuring data for next 5 seconds...")
        blink_rate, focus_score = track_blink_focus(duration=5)
        stress_level = detect_stress(duration=5)

        print(f"Blink Rate: {blink_rate:.2f} bpm")
        print(f"Focus Score: {focus_score}")
        print(f"Stress Level: {stress_level}")

        efs = calculate_efs(blink_rate, focus_score, stress_level)
        print(f"\n Eye Fatigue Score (EFS): {efs:.2f}")

        auto_adjust_screen(efs)

        if efs > 65:
            suggest_eye_exercise(efs)
            mp3_path = r"C:\\Users\\adity\\OneDrive\\Desktop\\visionguard_ai\\take_a_break.mp3"
            if os.path.exists(mp3_path):
                print("Playing break reminder...")
                playsound(mp3_path)
            else:
                print("take_a_break.mp3 not found!")

        print("\n Waiting 5 seconds before next check...\n")
        time.sleep(10)

if __name__ == "__main__":
    # Optional: Launch graph visualizer in parallel
    threading.Thread(target=show_stress_graph, daemon=True).start()
    run_visionguard()
