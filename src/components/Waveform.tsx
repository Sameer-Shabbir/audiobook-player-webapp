import { useMemo } from "react";

interface WaveformProps {
  isPlaying: boolean;
  barCount?: number;
  className?: string;
}

export function Waveform({
  isPlaying,
  barCount = 40,
  className = "",
}: WaveformProps) {
  const bars = useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) => ({
        id: `bar-${i}`,
        height: 20 + Math.random() * 80,
        delay: Math.random() * -1.5,
        duration: 0.4 + Math.random() * 0.6,
      })),
    [barCount],
  );

  return (
    <div
      className={`flex items-center justify-center gap-[2px] ${className}`}
      aria-hidden
    >
      {bars.map((bar) => (
        <div
          key={bar.id}
          className="w-[3px] rounded-full bg-primary/50"
          style={{
            height: `${bar.height}%`,
            animation: isPlaying
              ? `waveform-bounce ${bar.duration}s ease-in-out ${bar.delay}s infinite alternate`
              : undefined,
            transition: "height 0.4s ease",
            ...(isPlaying ? {} : { height: "15%" }),
          }}
        />
      ))}
    </div>
  );
}
