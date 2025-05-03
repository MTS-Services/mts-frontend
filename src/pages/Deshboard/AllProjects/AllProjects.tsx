import { BsPersonWorkspace } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FiPlusSquare } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { MdGroups, MdResetTv } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { TbPointerDollar, TbUserDollar } from "react-icons/tb";

import { useEffect, useState } from "react";
import AddProjectForm from "../../../components/AddProjectForm/AddProjectForm";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import { useSocket } from "../../../context/SocketContext";
import { useFetchData } from "../../../hooks/useFetchData";
import SingleDeshboardProject from "./SingleDeshboardProject";

function AllProjects() {
  const socket = useSocket();
  const { data, refetch, loading } = useFetchData(
    "http://192.168.10.47:3000/api/project",
  );

  const [team, setTeam] = useState([]);
  const [salesMember, setSalesMember] = useState([]);
  const [status, setStatus] = useState([]);
  const [profile, setProfile] = useState([]);

  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSalesMember, setSelectedSalesMember] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [calculation, setCalculation] = useState(null);

  useEffect(() => {
    if (!socket || !data?.projects) return;

    // Extract unique values
    const teamSet = new Set();
    const salesSet = new Set();
    const statusSet = new Set();
    const profileSet = new Set();

    data.projects.forEach((item) => {
      if (item.profile?.team?.team_name)
        teamSet.add(item.profile.team.team_name);
      if (item.team_member?.first_name)
        salesSet.add(item.team_member.first_name);
      if (item.status) statusSet.add(item.status);
      if (item.profile?.profile_name) profileSet.add(item.profile.profile_name);
    });

    setTeam([...teamSet]);
    setSalesMember([...salesSet]);
    setStatus([...statusSet]);
    setProfile([...profileSet]);
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    const handleProjectMoneyMetrics = (projectPageCardDetails) => {
      setCalculation(projectPageCardDetails);
    };

    socket.emit("ProjectPageCardDetails");
    socket.on("projectMoneyMetrics", handleProjectMoneyMetrics);

    return () => {
      socket.off("projectMoneyMetrics", handleProjectMoneyMetrics);
    };
  }, [socket]);

  const reset = () => {
    setSelectedProfile("");
    setSelectedStatus("");
    setSelectedSalesMember("");
    setSelectedTeam("");
  };

  const filteredData = data?.projects
    ?.map((item, index) => ({ ...item, originalIndex: index })) // step 1: preserve original index
    ?.filter((item) => {
      return (
        (!selectedProfile || item.profile?.profile_name === selectedProfile) &&
        (!selectedStatus || item.status === selectedStatus) &&
        (!selectedSalesMember ||
          item.team_member?.first_name === selectedSalesMember) &&
        (!selectedTeam || item.profile?.team?.team_name === selectedTeam)
      );
    })
    ?.sort((a, b) => a.originalIndex - b.originalIndex); // step 2: sort by original index

  console.log(filteredData);

  const cardData = [
    {
      title: "Total Operation",
      amount: calculation?.total_operations,
      icon: BsPersonWorkspace,
      message:
        "This shows the total operation amount earned this month by the operations team.",
    },
    {
      title: "Total Carry",
      amount: calculation?.total_carry,
      icon: FaFileInvoiceDollar,
      message:
        "This shows the total carry amount from last month by the operations team.",
    },
    {
      title: "Total Sales",
      amount: calculation?.total_sales,
      icon: FaHandHoldingDollar,
      message:
        "This shows the total sales amount in this month by the sales team.",
    },
    {
      title: "Total Assign",
      amount: calculation?.total_assign,
      icon: TbUserDollar,
      message:
        "This shows the total assign amount in this month to the operation team by the Project Manager.",
    },
    {
      title: "Need to Assign",
      amount: calculation?.need_to_assign,
      icon: TbPointerDollar,
      message:
        "This shows the total amount that need to assign to the operation team by the Project Manager.",
    },
  ];

  const [showModal, setShowModal] = useState(false);

  const columns = [
    "Client Name/ ID",
    "Department/ Team",
    "OP/ AF",
    "OP/SA Status",
    "Delivery Last Date",
    "PN / OB",
    "Sales Comments",
    "Ops Leader Comments",
  ];

  return (
    <section>
      <div className="font-secondary w-full overflow-x-auto p-4">
        <div className="border-accent/30 flex flex-wrap gap-5 border-b-1 pb-7">
          {cardData.map((item, index) => (
            <DisplayCard
              key={index}
              title={item.title}
              amount={item.amount}
              icon={item.icon}
              message={item.message}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-5 pt-7">
          <div className="flex flex-wrap gap-5">
            <SelectFilter
              icon={<RiUserFill />}
              value={selectedProfile}
              setValue={setSelectedProfile}
              options={profile}
            />
            <SelectFilter
              icon={<MdGroups />}
              value={selectedTeam}
              setValue={setSelectedTeam}
              options={team}
            />
            <SelectFilter
              icon={<BsPersonWorkspace />}
              value={selectedStatus}
              setValue={setSelectedStatus}
              options={status}
            />
            <SelectFilter
              icon={<FaHandHoldingDollar />}
              value={selectedSalesMember}
              setValue={setSelectedSalesMember}
              options={salesMember}
            />
            <div
              onClick={reset}
              className="border-accent bg-primary flex cursor-pointer rounded border-2 p-2 duration-150 hover:scale-95"
            >
              <div className="border-accent/30 flex items-center border-r-1 pr-2">
                <MdResetTv className="cursor-pointer" />
              </div>
              <button className="cursor-pointer px-2">Reset</button>
            </div>
          </div>

          <div className="font-secondary flex items-center justify-end gap-5">
            <div
              onClick={() => setShowModal(true)}
              className="border-accent bg-secondary flex cursor-pointer flex-wrap rounded border-2 p-2 duration-150 hover:scale-95"
            >
              <div className="border-accent/30 flex items-center border-r-1 pr-2">
                <FiPlusSquare className="cursor-pointer" />
              </div>
              <button className="cursor-pointer px-2">Add New Project</button>
            </div>

            {showModal && <AddProjectForm setShowModal={setShowModal} />}

            <div className="border-accent bg-secondary flex items-center justify-between gap-3 rounded border-2 p-2 duration-150 hover:scale-95">
              <div className="border-accent/30 flex items-center rounded border bg-white px-2 py-1">
                <input
                  type="text"
                  placeholder="Search project..."
                  className="text-background w-full bg-transparent text-sm outline-none"
                />
              </div>
              <div className="border-accent/30 flex items-center gap-2 border-l pl-3">
                <IoSearchSharp className="cursor-pointer text-lg" />
              </div>
            </div>
          </div>
        </div>

        <table className="mt-5 w-full border-collapse">
          <thead className="font-primary sticky top-0 bg-gray-100">
            <tr>
              {columns.map((item, index) => (
                <th
                  key={index}
                  className="text-accent bg-secondary text-md border px-4 py-5 text-left font-semibold whitespace-nowrap"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-secondary">
            {filteredData?.map((item, index) => (
              <SingleDeshboardProject
                refetch={refetch}
                key={index}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SelectFilter({ icon, setValue, value, options }) {
  return (
    <div className="bg-primary border-accent flex rounded border-2 p-2">
      <div className="bg-primary border-accent/30 flex items-center border-r-1 pr-2">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="bg-primary font-secondary border-accent/40 mr-2 ml-3 border px-3 focus:outline-0"
      >
        <option value="">Select All</option>
        {options?.map((item) => (
          <option key={item} value={item} className="p-2">
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AllProjects;
