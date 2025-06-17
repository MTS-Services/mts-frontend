import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const token = Cookies.get("core");

    fetch(
      "https://mtsbackend20-production.up.railway.app/api/attendance/monthly-attendance-report",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Attendance data:", data);
        setAttendanceData(data?.data || []);
        setEmployee(data?.employee || null);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  const tableHeaders = ["Date", "Check In", "Check Out"];

  return (
    <div className="font-secondary w-full p-4">
      <h2 className="text-accent mb-6 text-4xl font-bold">
        Attendance History : {employee?.first_name} {employee?.last_name}
      </h2>

      <div className="bg-primary">
        <table className="border-border-color w-full min-w-[1000px] border-2 text-white">
          <thead className="bg-secondary text-left text-white">
            <tr className="bg-secondary border border-white text-[16px] text-white">
              {tableHeaders.map((head) => (
                <th key={head} className="border border-white px-4 py-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-secondary border-2 border-white">
            {attendanceData.length > 0 ? (
              attendanceData.map((entry, idx) => (
                <tr
                  key={idx}
                  className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 text-white transition-all"
                >
                  {/* Date */}
                  <td className="border-secondary border-r px-4 py-4">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  {/* Check In */}
                  <td className="border-secondary border-r px-2 py-3">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`font-medium ${
                          entry.isLate === "Yes" ? "text-red-500" : "text-white"
                        }`}
                      >
                        {entry.firstPunchTime
                          ? new Date(entry.firstPunchTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              },
                            )
                          : "-"}
                      </span>
                    </div>
                  </td>

                  {/* Check Out */}
                  <td className="border-secondary border-r px-4 py-4">
                    {entry.lastPunchAfter530Time
                      ? new Date(
                          entry.lastPunchAfter530Time,
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-red-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
