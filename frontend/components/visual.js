"use client";
import { useEffect, useRef } from "react";

export default function Visual() {
  const videoRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket("ws://localhost:5000");

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
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex h-fit flex-col w-fit">
      <h1>Real-time Video Stream</h1>
      <img
        ref={videoRef}
        alt="Video stream"
        className="border-1 border-white"
      />
    </div>
  );
}
