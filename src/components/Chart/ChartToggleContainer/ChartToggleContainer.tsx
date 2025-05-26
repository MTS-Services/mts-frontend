import { useEffect, useState } from "react";
import { BiGridVertical } from "react-icons/bi";
import { HiViewGridAdd } from "react-icons/hi";

const ChartToggleContainer = ({
  mainFactorStatus,
  setMainFactorStatus,
  dropdownComponent = null,
  charts = [],
}) => {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chartViewMode") || "grid";
    }
    return "grid";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chartViewMode", viewMode);
    }
  }, [viewMode]);

  const hasTwoCharts = charts.length === 2;

  const toggleView = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <>
      {hasTwoCharts && (
        <div className="flex items-center justify-end gap-5">
          <div
            onClick={toggleView}
            className="bg-secondary/10 shadow-box-style shadow-primary/15 mt-14 cursor-pointer rounded p-1"
            title={`Switch to ${viewMode === "grid" ? "List" : "Grid"} View`}
          >
            {viewMode === "grid" ? (
              <BiGridVertical className="h-6 w-6" />
            ) : (
              <HiViewGridAdd className="h-6 w-6" />
            )}
          </div>
          {dropdownComponent && dropdownComponent}
        </div>
      )}

      {/* Chart container */}
      <div
        className={`my-12 flex flex-col gap-5 ${
          hasTwoCharts
            ? viewMode === "grid"
              ? "md:flex-row"
              : "md:flex-col"
            : ""
        }`}
      >
        {charts.map(({ component: ChartComp, props }, index) => (
          <div
            key={index}
            className={`bg-secondary/10 shadow-box-style shadow-primary/25 h-96 w-full p-2 ${
              hasTwoCharts
                ? viewMode === "grid"
                  ? "md:w-1/2"
                  : "md:w-full"
                : "w-full"
            }`}
          >
            <ChartComp {...props} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ChartToggleContainer;
