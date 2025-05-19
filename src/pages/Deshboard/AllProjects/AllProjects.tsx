import { BsPersonWorkspace } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FiPlusSquare } from "react-icons/fi";
import { MdGroups, MdResetTv } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { TbDevicesCancel, TbPointerDollar, TbUserDollar } from "react-icons/tb";

import { useContext, useEffect, useMemo, useState } from "react";
import AddProjectForm from "../../../components/AddProjectForm/AddProjectForm";
import DisplayCard from "../../../components/DisplayCard/DisplayCard";
import ProjectSearchBox from "../../../components/ProjectSearchBox/ProjectSearchBox";
import SelectFilter from "../../../components/SelectFilter/SelectFilter";
import { AuthContext } from "../../../context/AuthProvider";
import { useSocket } from "../../../context/SocketContext";
import { useFetchData } from "../../../hooks/useFetchData";
import SingleDeshboardProject from "./SingleDeshboardProject";

function AllProjects() {
  const socket = useSocket();
  const { data, refetch } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/project",
  );

  const { roleBasePermissionOne, role } = useContext(AuthContext);
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

    const teamSet = new Set();
    const salesSet = new Set();
    const statusSet = new Set();
    const profileSet = new Set();

    data.projects.forEach((item) => {
      if (item?.team?.team_name) teamSet.add(item.team.team_name);
      if (item.team_member?.first_name)
        salesSet.add(item.team_member.first_name);
      if (item.status) statusSet.add(item.status);
      if (item.profile?.profile_name) profileSet.add(item.profile.profile_name);
    });

    setTeam([...teamSet]);
    setSalesMember([...salesSet]);
    setStatus([...statusSet]);
    setProfile([...profileSet]);
  }, [socket, data]);

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
  }, [socket, data]);

  const { data: chartRawData, loading } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/api/team/teamwisechart",
    "GET",
    null,
    {
      refetchInterval: 2000, // Auto refetch every 2s
    },
  );

  const reset = () => {
    setSelectedProfile("");
    setSelectedStatus("");
    setSelectedSalesMember("");
    setSelectedTeam("");
  };

  const filteredData = useMemo(() => {
    return (
      data?.projects?.filter((item) => {
        const profileMatch =
          !selectedProfile ||
          item.profile?.profile_name?.toLowerCase().trim() ===
            selectedProfile.toLowerCase().trim();

        const statusMatch =
          !selectedStatus ||
          item.status?.toLowerCase().trim() ===
            selectedStatus.toLowerCase().trim();

        const salesMatch =
          !selectedSalesMember ||
          item.team_member?.first_name?.toLowerCase().trim() ===
            selectedSalesMember.toLowerCase().trim();

        const teamMatch =
          !selectedTeam ||
          item.team?.team_name?.toLowerCase().trim() ===
            selectedTeam.toLowerCase().trim();

        return profileMatch && statusMatch && salesMatch && teamMatch;
      }) || []
    );
  }, [
    data,
    selectedProfile,
    selectedStatus,
    selectedSalesMember,
    selectedTeam,
  ]);

  const cardData = [
    {
      title: "Team Target",
      amount: chartRawData?.teamTarget,
      icon: MdGroups,
      message: "Total monthly target assigned to the team.",
    },
    {
      title: "Total Carry",
      amount: chartRawData?.teamTotalCarry,
      icon: FaHandHoldingDollar,
      message: "Total carry forward from previous month.",
    },
    {
      title: role === "sales_leader" ? "Total Sales" : "Team Delivery",
      amount: chartRawData?.teamAchievement,
      icon: TbUserDollar,
      message: "Total deliveries completed this month.",
    },
    {
      title: "Team Assigned",
      amount: chartRawData?.totalAssign,
      icon: BsPersonWorkspace,
      message: "Total tasks assigned this month.",
    },
    {
      title: "Team Cancelled",
      amount: chartRawData?.teamCancelled,
      icon: TbDevicesCancel,
      message: "Total cancelled projects this month.",
    },
    {
      title: "Total Submitted",
      amount: chartRawData?.submitted,
      icon: TbPointerDollar,
      message: "Total tasks submitted by the team.",
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
              className="border-border-color bg-primary flex cursor-pointer rounded border-2 p-2 duration-150 hover:scale-95"
            >
              <div className="border-border-color/30 flex items-center border-r-1 pr-2">
                <MdResetTv className="cursor-pointer" />
              </div>
              <button className="cursor-pointer px-2">Reset</button>
            </div>
          </div>
          {!roleBasePermissionOne && (
            <div className="font-secondary flex items-center justify-end gap-5">
              <div
                onClick={() => setShowModal(true)}
                className="border-border-color bg-secondary flex cursor-pointer flex-wrap rounded border-2 p-2 duration-150 hover:scale-95"
              >
                <div className="border-border-color/30 flex items-center border-r-1 pr-2">
                  <FiPlusSquare className="cursor-pointer" />
                </div>
                <button className="cursor-pointer px-2">Add New Project</button>
              </div>

              {showModal && (
                <AddProjectForm setShowModal={setShowModal} refetch={refetch} />
              )}
              {/* Search.... */}
              <ProjectSearchBox refetch={refetch} />
            </div>
          )}
        </div>

        <section className="my-7 w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="font-primary sticky top-0 bg-gray-100">
                <tr>
                  {columns.map((item, index) => (
                    <th
                      key={index}
                      className="bg-secondary text-md border px-4 py-5 text-left font-semibold whitespace-nowrap"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-secondary">
                {filteredData?.map((item) => (
                  <SingleDeshboardProject
                    refetch={refetch}
                    key={item.id}
                    item={item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AllProjects;
