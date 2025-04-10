"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
// import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
// import { useUser } from "@clerk/nextjs";
// import { SignedIn } from "@clerk/nextjs";

export function Hero() {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const fatigueScore = 70;
  // const { user } = useUser();

  useEffect(() => {
    // useEffect(() => {
    //   if (!progressRef.current) return;

    //   const circle = progressRef.current;
    //   const score = fatigueScore; // Your Eye Fatigue Score (0–100)
    //   const radius = 45;
    //   const circumference = 2 * Math.PI * radius;

    //   const offset = circumference - (score / 100) * circumference;

    //   // Color based on score
    //   let color = "green";
    //   if (score > 75) color = "red";
    //   else if (score > 50) color = "yellow";

    //   circle.style.stroke = color;
    //   circle.style.strokeDashoffset = offset;
    // }, [fatigueScore]);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.warn("Canvas context not supported.");
      return;
    }

    const resizeCanvas = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const scale = window.devicePixelRatio || 1;

      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transforms
      ctx.scale(scale, scale); // High-DPI scaling
    };

    const drawCircularFrame = (img) => {
      const { width, height } = canvas;
      const scale = window.devicePixelRatio || 1;
      const logicalWidth = width / scale;
      const logicalHeight = height / scale;
      const radius = Math.min(logicalWidth, logicalHeight) / 2;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.save();
      ctx.beginPath();
      ctx.arc(logicalWidth / 2, logicalHeight / 2, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 0, 0, logicalWidth, logicalHeight);
      ctx.restore();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 10000,
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current.id);
      socketRef.current.emit("start_video");
    });

    socketRef.current.on("video_frame", (imageData) => {
      const img = new Image();
      img.onload = () => drawCircularFrame(img);
      img.onerror = (err) => console.error("Image load error:", err);
      img.src = `data:image/jpeg;base64,${imageData}`;
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative min-h-screen w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-black opacity-90">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full animate-streak">
              <div
                className="absolute w-1 h-full bg-gradient-to-t from-transparent via-blue-500 to-transparent opacity-50 animate-move"
                style={{ left: "20%" }}
              />
              <div
                className="absolute w-1 h-full bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-50 animate-move delay-200"
                style={{ left: "50%" }}
              />
              <div
                className="absolute w-1 h-full bg-gradient-to-t from-transparent via-indigo-500 to-transparent opacity-50 animate-move delay-400"
                style={{ left: "80%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-blue-950/30 z-10" />
            </div>

            <div className="container relative z-20 px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="flex-1 space-y-6 text-center lg:text-left">
                Hello!!
                {/* <SignedIn
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 animate-shimmer bg-[length:200%_100%]">
                    Welcome !! {user?.firstName}
                  </motion.h1>
                </SignedIn> */}
                <motion.p
                  className="max-w-[600px] text-zinc-400 md:text-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Get Your Eye Tracked!!
                </motion.p>
              </div>

              {/* Real-time Circular Video Canvas */}
              <motion.div
                ref={containerRef}
                className="flex-1 mt-20 mr-10 w-full max-w-[500px] aspect-square relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Main Circular Canvas Container */}
                <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm border border-blue-500/20 overflow-hidden shadow-[0_0_20px_4px_rgba(59,130,246,0.3)]">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>

                {/* Pulsing Glow Rings */}
                <div className="absolute -inset-4 border border-blue-500/20 rounded-full animate-pulse" />
                <div className="absolute -inset-8 border border-blue-500/10 rounded-full animate-pulse [animation-delay:1s]" />

                {/* Optional: Progress Ring */}
                <svg
                  className="absolute top-0 left-0 w-full h-full z-10"
                  viewBox="0 0 100 100"
                >
                  {/* Background ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                    fill="none"
                    className="shadow-blue-400"
                  />

                  {/* Dynamic ring */}
                  <circle
                    ref={progressRef}
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="282.6"
                    strokeDashoffset="282.6"
                    className="transition-all shadow-sky-700 duration-500 ease-in-out"
                  />
                </svg>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
