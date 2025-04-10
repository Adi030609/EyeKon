"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import io from "socket.io-client";

// ✅ Initialize socket connection
const socket = io("http://localhost:5000");

export function EyeFatigueScore() {
  const [score, setScore] = useState(75);
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [riskColor, setRiskColor] = useState("#FFD700");

  const [blinkRate, setBlinkRate] = useState(0); // ✅ store real blink rate
  const [focusScore, setFocusScore] = useState(0); // ✅ store real focus score

  // ✅ Listen for blink_stats data
  useEffect(() => {
    socket.on("blink_stats", (data) => {
      console.log("Blink stats:", data);
      const { blink_rate, focus_score, efs } = data;

      setBlinkRate(blink_rate);
      setFocusScore(focus_score);
      setScore(efs);
    });

    return () => {
      socket.off("blink_stats");
    };
  }, []);

  // ✅ Update risk level and color based on score
  useEffect(() => {
    if (score < 30) {
      setRiskLevel("Healthy");
      setRiskColor("#4ADE80"); // Green
    } else if (score < 70) {
      setRiskLevel("Moderate");
      setRiskColor("#FFD700"); // Yellow
    } else {
      setRiskLevel("High Risk");
      setRiskColor("#EF4444"); // Red
    }
  }, [score]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 shadow-lg max-w-md w-full">
      <h3 className="text-xl font-semibold text-white mb-6">
        Eye Fatigue Score (EFS)
      </h3>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full absolute" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
          />
        </svg>

        {/* Progress circle */}
        <svg
          className="w-full h-full absolute rotate-[-90deg]"
          viewBox="0 0 256 256"
        >
          <motion.circle
            cx="128"
            cy="128"
            r={radius}
            fill="none"
            stroke={riskColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>

        {/* Score display */}
        <div className="flex flex-col items-center justify-center z-10">
          <motion.div
            className="text-6xl font-bold"
            style={{ color: riskColor }}
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(score)}
          </motion.div>
          <motion.div
            className="text-lg font-medium mt-2"
            style={{ color: riskColor }}
            key={riskLevel}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {riskLevel}
          </motion.div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="text-sm text-zinc-400">Blink Rate</div>
          <div className="text-lg font-medium text-white">
            {blinkRate?.toFixed(1)}/min
          </div>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="text-sm text-zinc-400">Screen Time</div>
          <div className="text-lg font-medium text-white">—</div>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="text-sm text-zinc-400">Focus</div>
          <div className="text-lg font-medium text-white">
            {focusScore?.toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <div className="text-sm text-zinc-400 mb-2">AI Recommendation:</div>
        <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/50 text-blue-200 text-sm">
          {score > 70
            ? "Take a 20-minute break. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds."
            : score > 30
            ? "Consider adjusting your screen brightness and taking short breaks every hour to reduce eye strain."
            : "Your eye health looks good! Continue your current habits and remember to stay hydrated."}
        </div>
      </div>
    </div>
  );
}
