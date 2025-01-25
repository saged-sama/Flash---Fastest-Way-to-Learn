"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface FloatingSummaryProps {
  summary: string;
  onClose: () => void;
}

export const FloatingSummary = ({
  summary,
  onClose,
}: FloatingSummaryProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [charTimes, setCharTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    // Update more frequently for smoother transitions
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30); // Update every 30ms

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const generateSummary = async () => {
      const startTime = Date.now();
      for (let i = 0; i < summary.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 15)); // Faster character appearance (15ms)
        setCharTimes((prev) => [...prev, startTime + (i * 15)]); // Adjust timing to match
        setDisplayedText((prev) => prev + summary[i]);
      }
    };

    if (summary.length > 0) {
      setDisplayedText("");
      setCharTimes([]);
      generateSummary();
    }
  }, [summary]);

  // Function to calculate the color based on how long the character has been visible
  const getColorForCharacter = (appearanceTime: number) => {
    const timeSinceAppearance = currentTime - appearanceTime;
    const maxDuration = 1000; // 1 second to reach full darkness (faster than before)
    
    // Calculate darkness (0-255), starting from a darker gray (200 instead of 255)
    const intensity = Math.max(
      0,
      200 - Math.min(200, Math.floor((timeSinceAppearance / maxDuration) * 200))
    );
    
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white shadow-lg rounded-lg w-1/2 max-h-[50vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Summary</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto max-h-[40vh] p-4 space-y-2">
          <p className="text-base leading-relaxed"> {/* Added leading-relaxed for better readability */}
            {displayedText.split("").map((char, index) => (
              <span
                key={index}
                className="transition-colors duration-100 ease-in-out" // Faster transition duration
                style={{
                  color: getColorForCharacter(charTimes[index] || Date.now()),
                }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
