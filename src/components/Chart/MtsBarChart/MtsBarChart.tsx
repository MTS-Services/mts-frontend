import { ResponsiveBar } from "@nivo/bar";

const MtsBarChart = ({
  data = [],
  keys = ["target", "achieved"],
  indexBy = "memberName",
  legendKeys = [],
  legent = "Team Members",
}) => {
  return (
    <div
      style={{
        padding: "1rem",
        background: "transparent", // ✅ chart container is transparent
        borderRadius: "10px",
        height: "100%", // Ensures that the parent div doesn't extend beyond its container
        boxSizing: "border-box", // Ensures padding is included in the height
      }}
    >
      {/* 🔥 Dynamic Legend */}
      <div className="mb-4 flex gap-4">
        {legendKeys.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-white">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 📊 Chart */}
      <div style={{ height: "100%" }}>
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy={indexBy}
          margin={{ top: 40, right: 30, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          colors={({ id, index }) => {
            const fixedColors = [
              "#66c2a5",
              "#fc8d62",
              "#8da0cb",
              "#e78ac3",
              "#a6d854",
            ];
            if (index < fixedColors.length) return fixedColors[index];

            const d3Colors = [
              "#1f77b4",
              "#ff7f0e",
              "#2ca02c",
              "#d62728",
              "#9467bd",
              "#8c564b",
              "#e377c2",
              "#7f7f7f",
              "#bcbd22",
              "#17becf",
            ];
            return d3Colors[index % d3Colors.length];
          }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            legend: legent,
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Value",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#ffffff"
          tooltip={({ id, value, color, indexValue }) => (
            <div
              style={{
                padding: "6px 12px",
                background: "#000", // ✅ solid black tooltip background
                color: "#fff",
                border: `1px solid ${color}`,
                borderRadius: "4px",
              }}
            >
              <strong>
                {indexValue} - {id}:
              </strong>{" "}
              {value}
            </div>
          )}
          theme={{
            grid: {
              line: {
                stroke: "#444",
                strokeDasharray: "4 4", // ✅ dashed grid
              },
            },
            axis: {
              domain: {
                line: {
                  stroke: "#ffffff",
                },
              },
              ticks: {
                line: {
                  stroke: "#ffffff",
                },
                text: {
                  fill: "#ffffff", // ✅ axis numbers white
                },
              },
              legend: {
                text: {
                  fill: "#ffffff", // ✅ axis titles white
                },
              },
            },
            legends: {
              text: {
                fill: "#ffffff",
              },
            },
            labels: {
              text: {
                fill: "#ffffff", // ✅ label inside bars white
              },
            },
            tooltip: {
              container: {
                background: "#000", // ✅ black background
                color: "#fff",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)", // optional depth
              },
            },
          }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default MtsBarChart;
