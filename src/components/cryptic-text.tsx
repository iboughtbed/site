"use client";

import * as React from "react";

interface CrypticTextProps {
  children: string;
  className?: string;
  speed?: number;
  iterations?: number;
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export function CrypticText({
  children: text,
  className,
  speed = 35,
  // iterations = 1,
}: CrypticTextProps) {
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    if (!text) {
      setDisplayText("");
      return;
    }

    let currentLength = 0;
    // let currentIteration = 0;
    const maxLength = text.length;

    const intervalId = setInterval(() => {
      if (currentLength <= maxLength) {
        setDisplayText(() => {
          return text
            .slice(0, currentLength)
            .split("")
            .map((char) => {
              const randomChance = (maxLength - currentLength) / maxLength;
              if (Math.random() < randomChance) {
                return characters[
                  Math.floor(Math.random() * characters.length)
                ];
              }
              return char === " " ? " " : char;
            })
            .join("");
        });

        currentLength += 1;

        // } else if (currentIteration < iterations - 1) {
        //   currentIteration += 1;
        //   currentLength = 0;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
}
