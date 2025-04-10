import os

def toggle_night_light():
    try:
        import winreg
    except ImportError:
        print("This script only works on Windows.")
        return

    reg_key = winreg.OpenKeyEx(
        winreg.HKEY_CURRENT_USER,
        r"Software\Microsoft\Windows\CurrentVersion\CloudStore\Store\Cache\DefaultAccount\$$windows.data.bluelightreduction.settings\Current",
        0,
        winreg.KEY_ALL_ACCESS
    )

    try:
        value, regtype = winreg.QueryValueEx(reg_key, "Data")
        enabled = value[108]
        new_value = value[:108] + (0 if enabled else 1).to_bytes(1, 'little') + value[109:]
        winreg.SetValueEx(reg_key, "Data", 0, regtype, new_value)
        print("Night light toggled successfully.")
    except FileNotFoundError:
        print("Night light settings not found.")
    finally:
        winreg.CloseKey(reg_key)

if __name__ == "__main__":
    toggle_night_light()