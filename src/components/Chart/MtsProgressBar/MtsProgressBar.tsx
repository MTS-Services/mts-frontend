import { useTheme } from "../../../context/ThemeContext"; // ✅ Import theme context

const MtsProgressBar = () => {
  const { theme } = useTheme(); // ✅ Get current theme

  const textColor = theme === "light-mode" ? "#000000" : "#ffffff";
  const trackColor =
    theme === "light-mode" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";

  const progressItems = [
    { label: "Target", value: 70 },
    { label: "Delivered", value: 50 },
    { label: "Assigned", value: 80 },
    { label: "Cancelled", value: 20 },
    { label: "Submitted", value: 90 },
    { label: "Need to Assign", value: 40 },
  ];

  return (
    <div className="flex flex-col gap-5">
      {progressItems.map((item, index) => (
        <div key={index}>
          <div
            className="mb-1 flex justify-between"
            style={{ color: textColor }}
          >
            <span>{item.label}</span>
            <span>{item.value}%</span>
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
