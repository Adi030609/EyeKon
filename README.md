# 👁️ EyeKon: AI-Powered Digital Eye Care System

## Badges

[![GitHub contributors](https://img.shields.io/github/contributors/Adi030609/EyeKon)](https://github.com/Adi030609/EyeKon/graphs/contributors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-informational)](https://www.typescriptlang.org/)

---

## 💡 Overview

**EyeKon** is an advanced, AI-driven digital eye care system designed to promote healthier screen usage and prevent digital eye strain. By leveraging **computer vision** and machine learning, EyeKon monitors the user's physical and mental state in real-time, providing actionable feedback and automated workspace adjustments.

It monitors key indicators like fatigue, stress, and focus to ensure a safer, more productive workflow.

---

## 🚀 Features

* **Real-Time Eye & Gaze Tracking:** Uses **OpenCV** and **dlib** for accurate detection of blinks, gaze direction, and focus duration.
* **Fatigue Detection:** Calculates a scientifically backed, real-time fatigue score to signal when a rest is needed.
* **Stress Analysis:** Analyzes micro-expressions to estimate and track user stress levels throughout the workday.
* **Screen Automation:** Dynamically adjusts screen brightness and color temperature (e.g., activating a blue-light filter) based on lighting and user state.
* **Workspace Optimization:** Provides contextual, ergonomic suggestions for improved posture and eye-screen distance.
* **Proactive Break Reminders:** Sends timely **audio alerts** to ensure the user takes necessary breaks and follows the 20-20-20 rule.

---

## 🛠️ Tech Stack

EyeKon is a full-stack application with a modular, event-driven architecture.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Core Logic/Backend** | **Python** (3.x) | Computer Vision, AI models, Data Processing, System Automation. |
| **Vision Libraries** | **OpenCV**, **dlib**, **NumPy** | Facial and Eye Landmark Detection, Image Processing. |
| **Frontend/UI** | **TypeScript**, **JavaScript**, **CSS** | User Interface, Configuration, Real-time Dashboard Display. |
| **Architecture** | Modular & Event-Driven | Ensures high responsiveness and scalability. |

---

## 📦 Installation

To get EyeKon running locally, follow these steps:

### Prerequisites

* Python 3.8+
* Node.js & npm (for the frontend)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Adi030609/EyeKon.git](https://github.com/Adi030609/EyeKon.git)
    cd EyeKon/backend
    ```
2.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    # This file should contain: opencv-python, dlib, numpy, etc.
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install Node dependencies:**
    ```bash
    npm install
    ```

---

## ▶️ Usage

### Running the System

1.  **Start the Backend (Vision/Core)**:
    ```bash
    # From the main 'EyeKon' directory
    python main/main_script.py 
    ```
2.  **Start the Frontend (Dashboard)**:
    ```bash
    # From the 'frontend' directory
    npm run dev 
    ```
    The system will start running and should be accessible via your browser at `http://localhost:3000` (or similar, depending on your frontend setup).

### Configuration

Customize settings like reminder frequency, sensitivity of fatigue detection, and screen automation limits within the frontend dashboard.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE.txt` for more information.

---

## 📧 Contact

* **Adi030609** - [GitHub Profile](https://github.com/Adi030609)
* **Project Link:** [https://github.com/Adi030609/EyeKon](https://github.com/Adi030609/EyeKon)
