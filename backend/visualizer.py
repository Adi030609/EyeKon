import matplotlib.pyplot as plt
import matplotlib.animation as animation
from stress_detector import get_stress_history
from blink_focus_tracker import get_blink_history  # You will add this soon

def animate(i):
    stress = get_stress_history()
    blinks = get_blink_history()

    plt.cla()
    plt.plot(stress, color='red', label='Stress Level')
    plt.plot(blinks, color='blue', label='Blink Rate')

    plt.ylim(0, 100)
    plt.title("Real-Time Stress & Blink Rate")
    plt.ylabel("Level")
    plt.xlabel("Time (updates every 5s)")
    plt.legend(loc="upper right")
    plt.tight_layout()

def show_stress_graph():
    ani = animation.FuncAnimation(plt.gcf(), animate, interval=5000)
    plt.show()
