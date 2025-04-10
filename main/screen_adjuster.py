import subprocess
import screen_brightness_control as sbc

def toggle_night_light(enable=True):
    # Simulate Night Light via brightness shift (true night light needs system hacks)
    simulated_brightness = 30 if enable else 100
    script = f'''
    $MonitorSettings = Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBrightnessMethods
    $MonitorSettings.WmiSetBrightness(1, {simulated_brightness})
    '''
    try:
        subprocess.run(["powershell", "-Command", script], shell=True)
        print(f"[Night Light] {'Simulated Enable' if enable else 'Simulated Disable'}")
    except Exception as e:
        print(f"[Night Light Error] {e}")

def auto_adjust_screen(efs):
    print(f"[Screen Adjuster] Adjusting screen for EFS: {efs:.2f}")

    try:
        displays = sbc.list_monitors()
        print(f"[Screen Adjuster] Detected displays: {displays}")
    except Exception as e:
        print(f"[Screen Adjuster] Could not list monitors: {e}")
        displays = []

    brightness = max(30, 100 - int(efs))

    try:
        if displays:
            sbc.set_brightness(brightness)
            print(f"[Screen Adjust] Brightness set to {brightness}%")
        else:
            print("[Screen Adjust] No controllable monitors detected.")
    except Exception as e:
        print(f"Error setting brightness: {e}")

    # Simulate Night Light
    if efs > 70:
        toggle_night_light(True)
    else:
        toggle_night_light(False)


# efs_test_value = 75  # Simulate high fatigue
# auto_adjust_screen(efs_test_value)
