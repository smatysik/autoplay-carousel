import { useState, useEffect, useCallback, useRef } from "react";

interface Timer {
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
}

export const useTimer = (duration: number): Timer => {
  const [time, setTime] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!timer.current) {
      timer.current = setInterval(() => setTime((state) => state + 100), 100);
    }
  }, []);

  const pause = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  useEffect(() => {
    if (time >= duration) {
      pause();
    }
  }, [time, duration, pause]);

  return { pause, reset, start, time };
};
