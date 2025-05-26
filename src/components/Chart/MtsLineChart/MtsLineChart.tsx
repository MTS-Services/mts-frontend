import { ResponsiveLine } from "@nivo/line";

const MtsLineChart = ({ data }) => {
  return (
    <div style={{ height: "450px", background: "transparent" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 40, right: 30, bottom: 70, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45, // ⬅️ Rotates the date labels
          legend: "Date",
          legendOffset: 50,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Amount",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        theme={{
          background: "transparent",
          textColor: "#ffffff",
          axis: {
            ticks: {
              text: {
                fill: "#ffffff",
              },
            },
            legend: {
              text: {
                fill: "#ffffff",
              },
            },
          },
          grid: {
            line: {
              stroke: "#444444",
              strokeDasharray: "4 4",
            },
          },
          tooltip: {
            container: {
              background: "#000000",
              color: "#ffffff",
              borderRadius: "4px",
              fontSize: "14px",
            },
          },
        }}
        colors={{ scheme: "nivo" }}
        enableSlices="x"
      />
    </div>
  );
};

export default MtsLineChart;
