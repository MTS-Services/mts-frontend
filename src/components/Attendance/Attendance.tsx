import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";

interface Attendance {
  date: string;
  checkIn: string;
  checkOut: string;
}

const Attendance: React.FC = () => {
  const [data, setData] = useState<Attendance[]>([
    {
      date: new Date().toLocaleDateString(),
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
    },
    {
      date: new Date().toLocaleDateString(),
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
    },
  ]);

  const { data: datas } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/attendance/monthly-attendance-report",
  );

  console.log("Attendance data:", datas);

  const tableHeaders = ["Date", "Check In", "Check Out"];

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="text-accent mb-4 text-2xl font-bold">
        Attendance History
      </h2>
      <div className="bg-primary d w-full overflow-x-auto rounded shadow">
        <table className="w-full border-collapse text-sm">
          <thead className="font-primary sticky top-0">
            <tr>
              {tableHeaders.map((item, index) => (
                <th
                  key={index}
                  className="bg-secondary text-md text-accent border px-4 py-5 text-left font-semibold whitespace-nowrap"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-secondary">
            {datas?.data?.map((entry, idx) => (
              <tr key={idx} className="color-border-color border-b">
                <td
                  className={`px-4 py-4 whitespace-nowrap ${
                    idx % 2 === 0 ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {entry?.date}
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap ${
                    idx % 2 === 0 ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {entry?.firstPunchTime}
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap ${
                    idx % 2 === 0 ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {entry?.lastPunchAfter530Time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
