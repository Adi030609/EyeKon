"use client";
import { useEffect, useRef } from "react";
// import styles from "../styles/Home.module.css";

export default function Home() {
  const videoRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection with new port
    wsRef.current = new WebSocket("ws://localhost:5000"); // Changed from 8765 to 5000

    wsRef.current.onmessage = (event) => {
      // Update image source with received base64 data
      if (videoRef.current) {
        videoRef.current.src = `data:image/jpeg;base64,${event.data}`;
      }
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup on component unmount
    return () => {
      if (wsRef.current) {
        setIsModalOpen(false);
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="h-full w-full">
      <h1>Real-time Video Stream</h1>
      <img
        ref={videoRef}
        alt="Video stream"
        className="border-1 border-amber-50"
      />
    </div>
  );
}
