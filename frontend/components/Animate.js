import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90">
        {/* Vertical Streaks Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full animate-streak">
            <div className="absolute w-1 h-full bg-gradient-to-t from-transparent via-blue-500 to-transparent opacity-50 animate-move"></div>
            <div className="absolute w-1 h-full bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-50 animate-move delay-200"></div>
            <div className="absolute w-1 h-full bg-gradient-to-t from-transparent via-indigo-500 to-transparent opacity-50 animate-move delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
