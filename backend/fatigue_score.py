# fatigue_score.py

def calculate_efs(blink_rate, focus_score, stress_level=50):
    """
    Calculate Eye Fatigue Score (EFS).
    Lower blink rate & higher focus = Higher fatigue.
    Higher stress = higher fatigue.
    """
    # Normalize components
    blink_component = 100 - min(blink_rate, 100)  # scale blink_rate
    focus_component = focus_score          # inverse of focus
    stress_component = stress_level              # from emotion API later

    # Weighted average
    efs = (0.4 * blink_component) + (0.4 * focus_component) + (0.2 * stress_component)
    return efs


# if __name__ == "__main__":
#     efs = calculate_efs(blink_rate=1.5, focus_score=60, stress_level=50)
#     print(f"EFS: {efs:.2f}")
