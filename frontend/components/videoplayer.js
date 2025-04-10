"use client";

import React from "react";

const VideoPlayer = ({
  src,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  className = "",
}) => {
  return (
    <div className={`w-full h-auto max-w-3xl mx-auto ${className}`}>
      <video
        className="w-full h-auto rounded-xl shadow-lg"
        src={src}
        autoPlay={autoPlay}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
