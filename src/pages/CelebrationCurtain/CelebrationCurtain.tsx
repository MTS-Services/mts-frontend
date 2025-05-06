import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";

const CelebrationCurtain = ({ children }) => {
  const [showCurtain, setShowCurtain] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [canTrigger, setCanTrigger] = useState(false);
  const confettiInterval = useRef(null);

  useEffect(() => {
    const visited = localStorage.getItem("curtain_shown");
    if (!visited) {
      setShowCurtain(true);
      setCanTrigger(true);
    }
  }, []);

  const triggerCurtain = () => {
    if (!canTrigger) return;

    localStorage.setItem("curtain_shown", "true");
    setIsOpen(true);
    startCanvasConfetti();

    setTimeout(() => {
      stopCanvasConfetti();
      setShowCurtain(false);
    }, 10000); // Total: 10s
  };

  const startCanvasConfetti = () => {
    const end = Date.now() + 5000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 20,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 1 },
        colors: ["#19b3e7", "#4CAF50", "#FFC107", "#E91E63", "#3F51B5"],
      });

      confetti({
        particleCount: 20,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 1 },
        colors: ["#19b3e7", "#4CAF50", "#FFC107", "#E91E63", "#3F51B5"],
      });
    }, 250);

    confettiInterval.current = interval;
  };

  const stopCanvasConfetti = () => {
    if (confettiInterval.current) {
      clearInterval(confettiInterval.current);
    }
  };

  if (!showCurtain) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#11284A] text-white">
      <section className={`relative h-full w-full ${isOpen ? "open" : ""}`}>
        {/* Trigger Button */}
        {!isOpen && (
          <button
            onClick={triggerCurtain}
            className="absolute top-10 left-1/2 z-50 -translate-x-1/2 transform rounded-lg bg-[#19b3e7] px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#148abf]"
          >
            Let’s Celebrate 🎉
          </button>
        )}

        {/* Welcome Text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <div className="rounded-xl bg-white/10 p-8 shadow-2xl backdrop-blur-md">
            <h1 className="animate-pulse text-5xl font-bold text-white">
              🎉 Welcome to Our Website 🎉
            </h1>
            <p className="mt-4 text-lg">Enjoy the celebration 🎊</p>
          </div>
        </div>

        {/* Left Curtain */}
        <div
          className={`absolute top-[-10%] bottom-0 left-0 z-30 flex h-[120vh] w-1/2 justify-between transition-transform duration-[2000ms] ease-in-out ${
            isOpen ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`left-${i}`}
              className="h-full w-[10vw] animate-[curtainWiggle_2s_ease-in-out_infinite] bg-[repeating-linear-gradient(to_left,#19b3e7_4vw,#11284a_8vw,#19b3e7_10vw)] shadow-[inset_-2px_0_5px_rgba(0,0,0,0.5)]"
            />
          ))}
        </div>

        {/* Right Curtain */}
        <div
          className={`absolute top-[-10%] right-0 bottom-0 z-30 flex h-[120vh] w-1/2 justify-between transition-transform duration-[2000ms] ease-in-out ${
            isOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`right-${i}`}
              className="h-full w-[10vw] animate-[curtainWiggle_2s_ease-in-out_infinite] bg-[repeating-linear-gradient(to_left,#19b3e7_4vw,#11284a_8vw,#19b3e7_10vw)] shadow-[inset_-2px_0_5px_rgba(0,0,0,0.5)]"
            />
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes curtainWiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CelebrationCurtain;
