import { ResponsiveLine } from "@nivo/line";

const MtsLineChart = ({
  data = [],
  customColors = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"],
  showArea = true,
}) => {
  const fallbackColors = [
    "#FF9B45",
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

  const getLineColor = (index) =>
    index < customColors.length
      ? customColors[index]
      : fallbackColors[index % fallbackColors.length];

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", stacked: false, min: "auto", max: "auto" }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Amount",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        enablePoints={true}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableArea={showArea}
        areaOpacity={0.2}
        useMesh={true}
        colors={({ index }) => getLineColor(index)}
        tooltip={({ point }) => (
          <div
            style={{
              background: "#000",
              color: "#fff",
              padding: "6px 12px",
              border: `1px solid ${point.serieColor}`,
              borderRadius: "4px",
            }}
          >
            <strong>{point.serieId}:</strong> {point.data.yFormatted}
          </div>
        )}
        theme={{
          axis: {
            domain: { line: { stroke: "#ffffff" } },
            ticks: {
              line: { stroke: "#ffffff" },
              text: { fill: "#ffffff" },
            },
            legend: {
              text: { fill: "#ffffff" },
            },
          },
          grid: {
            line: {
              stroke: "#444",
              strokeDasharray: "4 4",
            },
          },
          tooltip: {
            container: {
              background: "#000",
              color: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            },
          },
        }}
      />
    </div>
  );
};

export default MtsLineChart;
