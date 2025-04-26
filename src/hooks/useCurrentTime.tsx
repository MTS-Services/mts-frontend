import { useEffect, useState } from "react";

export function useCurrentTime(targetDateString) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    if (!targetDateString) return;

    const targetDate = new Date(targetDateString);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now; // difference in milliseconds

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      // Now we don't check if difference <= 0
      // We allow negative days and hours also
      setTimeLeft({ days, hours });
    };

    updateCountdown(); // initial run
    const interval = setInterval(updateCountdown, 60000); // update every minute

    return () => clearInterval(interval);
  }, [targetDateString]);

  return timeLeft;
}
