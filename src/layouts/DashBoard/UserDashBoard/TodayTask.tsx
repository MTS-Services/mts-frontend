import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import {
  MdAttachMoney,
  MdCheckCircle,
  MdEdit,
  MdAccessTime,
  MdArrowCircleDown,
} from "react-icons/md";

import "react-datepicker/dist/react-datepicker.css";
import ResetButton from "../../../components/Button/ResetButton";

const SalesProject = () => {
  const [filter, setFilter] = useState({
    startDate: null,
    endDate: null,
    status: "",
  });

  const mtsTargets = [
    {
      title: "Total Sales :",
      amount: "1000",
      icon: <MdAttachMoney size={24} />,
    },
    { title: "Cancel :", amount: "4", icon: <MdEdit size={24} /> },
    { title: "Delivery:", amount: "2", icon: <MdCheckCircle size={24} /> },
    {
      title: "Submit :",
      amount: "2",
      icon: <MdArrowCircleDown size={24} />,
    },
    { title: "Short Time :", amount: "2", icon: <MdAccessTime size={24} /> },
  ];

  const tableHeaders = [
    "Client Name",
    "Last Update",
    "Assign",
    "Expect Finish Time",
    "Status",
    "Delivery Last Date",
  ];

  const [tableData, setTableData] = useState([
    ["Alex", "04/25/2025", "Kamrul", "10:30 AM", "Done", "05/25/2025"],
    ["Jordan", "06/26/2025", "Sunny", "11:30 AM", "Pending", "07/26/2025"],
    ["Rifat", "07/27/2025", "Munshi", "9:00 AM", "Wip", "08/27/2025"],
    ["John", "09/28/2025", "Munshi", "9:00 AM", "Wip", "10/30/2025"],
    ["Smith", "11/01/2025", "Munshi", "9:00 AM", "Wip", "12/31/2025"],
    ["David", "12/05/2025", "Ali", "1:00 PM", "Done", "01/05/2026"],
    ["Maria", "02/15/2026", "Sara", "3:00 PM", "Pending", "03/15/2026"],
    ["Sophia", "03/10/2026", "Ahmed", "2:00 PM", "Wip", "04/10/2026"],
    ["Daniel", "05/18/2026", "Liam", "4:00 PM", "Done", "06/18/2026"],
    ["Olivia", "07/22/2026", "Zara", "10:00 AM", "Pending", "08/22/2026"],
    ["Luke", "08/30/2026", "Jack", "11:45 AM", "Wip", "09/30/2026"],
    ["Emily", "10/05/2026", "Michael", "5:00 PM", "Done", "11/05/2026"],
    ["James", "11/11/2026", "William", "12:00 PM", "Pending", "12/11/2026"],
    ["Ava", "12/14/2026", "Benjamin", "7:30 AM", "Wip", "01/14/2027"],
    ["Isabella", "02/20/2027", "Lucas", "8:30 AM", "Done", "03/20/2027"],
    ["Ethan", "04/10/2027", "Mia", "3:30 PM", "Pending", "05/10/2027"],
    ["Mason", "06/01/2027", "Zoe", "6:00 PM", "Wip", "07/01/2027"],
    ["Charlotte", "07/25/2027", "Grace", "9:30 AM", "Done", "08/25/2027"],
    ["Amelia", "09/03/2027", "Elijah", "4:30 PM", "Pending", "10/03/2027"],
    ["Sebastian", "11/12/2027", "Ella", "2:30 PM", "Wip", "12/12/2027"],
  ]);

  const statusOptions = [...new Set(tableData.map((row) => row[4]))];

  // Extract only the date part for filtering
  const filteredData = tableData.filter((row) => {
    const lastUpdate = new Date(row[1]);
    const deliveryLastDate = new Date(row[5]);
    const startDateMatch = filter.startDate
      ? lastUpdate >= filter.startDate
      : true;
    const endDateMatch = filter.endDate
      ? deliveryLastDate <= filter.endDate
      : true;
    const statusMatch = filter.status ? row[4] === filter.status : true;

    return startDateMatch && endDateMatch && statusMatch;
  });

  const handleChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const handleReset = () => {
    setFilter({ startDate: null, endDate: null, status: "" });
  };

  return (
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10 lg:px-14">
      {/* Dashboard Summary Cards */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        {mtsTargets.map(({ title, amount, icon }, idx) => (
          <div
            key={idx}
            className="bg-primary border-border-color relative w-full rounded-sm border-2 p-4 text-white md:w-[30%] lg:h-28 lg:w-[20%] xl:w-[14%]"
          >
            <div className="flex items-center gap-2">
              {icon}
              <h2 className="text-sm md:text-xl">{title}</h2>
            </div>
            <h2 className="text-sm md:text-xl">{amount}</h2>
          </div>
        ))}
      </div>

      {/* Filter Dropdowns */}
      <div className="my-4 mt-10 flex gap-4">
        <div className="border-accent text-accent bg-background w-full max-w-48 rounded-md border px-4 py-2 text-sm">
          <label
            htmlFor="startDate"
            className="flex items-center justify-center gap-2"
          >
            Start Date <FcCalendar size={20} />
          </label>
          <DatePicker
            selected={filter.startDate}
            onChange={(date) => setFilter({ ...filter, startDate: date })}
            dateFormat="P"
            placeholderText="MM/DD/YYYY"
            className="bg-background w-full px-8 py-2 text-sm"
          />
        </div>

        <div className="border-accent text-accent bg-background w-full max-w-48 rounded-md border px-4 py-2 text-sm">
          <label
            htmlFor="endDate"
            className="flex items-center justify-center gap-2"
          >
            End Date <FcCalendar size={20} />
          </label>
          <DatePicker
            selected={filter.endDate}
            onChange={(date) => setFilter({ ...filter, endDate: date })}
            dateFormat="P"
            placeholderText="MM/DD/YYYY"
            className="bg-background w-full px-8 py-2 text-sm"
          />
        </div>

        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="border-accent text-accent bg-background w-full max-w-48 rounded-md border px-4 py-2 text-sm"
        >
          <option value="">Filter by Status</option>
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
        {/* Reset Button */}

        <ResetButton className="flex justify-start" onClick={handleReset}>
          Reset
        </ResetButton>
      </div>

      {/* Project Details Table */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="bg-secondary border border-white text-[16px] text-white">
              {tableHeaders.map((head, i) => (
                <th
                  key={head}
                  className={`border border-white px-2 py-3 ${
                    i === 0 ? "border-x" : ""
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-2 border-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-primary even:bg-primary/70 hover:bg-primary/80 transform text-sm text-white transition-all duration-300 ease-in-out"
                >
                  {row.map((cell, colIndex) => {
                    const isCalendarCol = colIndex === 3;
                    const isStatusCol = colIndex === 4;
                    return (
                      <td
                        key={colIndex}
                        className={`border-secondary font-primary border-r px-2 py-3 font-normal ${
                          colIndex === 0 ? "border-x" : ""
                        }`}
                      >
                        {isCalendarCol || isStatusCol ? (
                          <div className="relative flex w-full items-center">
                            <select
                              value={cell}
                              onChange={(e) =>
                                handleChange(rowIndex, colIndex, e.target.value)
                              }
                              className="w-full appearance-none border-none bg-transparent pr-4 text-sm text-white focus:outline-none"
                            >
                              {(isCalendarCol
                                ? tableData.map((row) => row[3]) // Use the time from table data
                                : statusOptions
                              ).map((opt) => (
                                <option
                                  key={opt}
                                  value={opt}
                                  className="bg-primary px-2 py-1 text-white"
                                >
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <MdArrowDropDown className="pointer-events-none absolute right-1 text-lg text-white" />
                          </div>
                        ) : (
                          cell
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="py-4 text-center">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesProject;
