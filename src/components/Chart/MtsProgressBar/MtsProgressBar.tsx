import { useTheme } from "../../../context/ThemeContext";

const MtsProgressBar = ({ title, progressItems }) => {
  const { theme } = useTheme();
  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const trackColor =
    theme === "light-mode" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";

  return (
    <div className="font-primary flex flex-col gap-5">
      <h1 className="text-bold text-2xl" style={{ color: textColor }}>
        {title}
      </h1>
      {progressItems.map((item, index) => (
        <div key={index}>
          <div
            className="mb-1 flex justify-between"
            style={{ color: textColor }}
          >
            <span>{item.label}</span>
            <span>{parseFloat(item.value).toFixed(2)}%</span>
          </div>
          <div
            className="relative h-4 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: trackColor }}
          >
            <div
              className="bg-primary absolute top-0 left-0 h-4 rounded-full"
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MtsProgressBar;
