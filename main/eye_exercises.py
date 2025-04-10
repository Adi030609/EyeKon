import time
def suggest_eye_exercise(efs):
    """
    Suggests eye exercises based on Eye Fatigue Score (EFS).
    Trigger alert if EFS > 60.
    """
    if efs > 60:
        print("\n[Eye Exercise Alert]")
        print("Look at something 20 feet away for 20 seconds.")
        print("Blink slowly 10 times to relax your eyes.\n")
        time.sleep(2)
        return True
    else:
        print("[Eye Exercise] No break needed. You’re good.")
        return False

    
    
# if __name__ == "__main__":
#     suggest_eye_exercise(efs=72)  # triggers break
