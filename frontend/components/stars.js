// components/StarBackground.js
"use client";
import { useEffect, useRef } from "react";

const StarBackground = ({ children }) => {
  const containerRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    let animationFrameId;

    // Generate random initial positions and speeds for stars
    const stars = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      top: Math.random() * 100, // Percentage
      left: Math.random() * 100, // Percentage
      speed: Math.random() * 0.3 + 0.1, // Random speed between 0.1 and 0.4
    }));
    starsRef.current = stars;

    const smoothScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        starsRef.current.forEach((star) => {
          const starElement = document.querySelector(
            `[data-star-id="${star.id}"]`
          );
          if (starElement) {
            // Calculate target position with parallax effect
            const targetY =
              scrollY * star.speed + (star.top * window.innerHeight) / 100;
            const currentY = parseFloat(
              starElement.style.transform
                .replace("translateY(", "")
                .replace("px)", "") || "0"
            );

            // Apply easing for smooth movement
            const ease = 0.1;
            const newY = currentY + (targetY - currentY) * ease;

            starElement.style.transform = `translateY(${newY}px)`;
          }
        });

        // Request next frame
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(smoothScroll);

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh] overflow-hidden"
      style={{ backgroundColor: "#050314" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-black via-blue-950/10 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-black blur-[100px]"></div>

      {Array.from({ length: 250 }).map((_, index) => {
        const top = Math.random() * 100; // Percentage
        const left = Math.random() * 100; // Percentage
        return (
          <div
            key={index}
            data-star-id={index}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-70"
            style={{
              top: `${top}%`,
              left: `${left}%`,
            }}
          />
        );
      })}

      {/* Pass children to allow custom content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default StarBackground;
