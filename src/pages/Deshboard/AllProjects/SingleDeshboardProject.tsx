import { useContext, useEffect, useRef, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { debounce } from "../../../components/utility/debounce";
import { AuthContext } from "../../../context/AuthProvider";
import { useSocket } from "../../../context/SocketContext";
import { useTheme } from "../../../context/ThemeContext";
import { useCurrentTime } from "../../../hooks/useCurrentTime";
import { useSocketData } from "../../../hooks/useSocketData";
import { useSalesMembers } from "../../../hooks/useSocketDataUtils";
import { useUpdateProject } from "../../../hooks/useUpdateProject";

function SingleDeshboardProject({ item, refetch }) {
  const { roleBasePermissionOne, roleBasePermissionTwo } =
    useContext(AuthContext);
  const socket = useSocket();
  const { theme } = useTheme();
  const { days, hours } = useCurrentTime(item.deli_last_date);
  const [date, setDate] = useState(item.deli_last_date);
  const [extension, setExtension] = useState(item.extension ?? 0);
  const [show, setShow] = useState(true);
  const [saleComment, setSaleComment] = useState(item.sales_comments ?? "");
  const [operationComment, setOperationComment] = useState(
    item.opsleader_comments ?? "",
  );

  const [meeting, setMeeting] = useState(
    item?.sales_comments?.toLowerCase().includes("meeting"),
  );

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(
    item.department_id,
  );
  const [selectedTeamId, setSelectedTeamId] = useState(item?.team_id);

  const [profileId, setProfileId] = useState(item?.profile_id);
  const [salesId, setSalesId] = useState(item?.ordered_by);
  const [opstatus, setOpstatus] = useState(item.ops_status ?? "nra");
  const [sastatus, setSastatus] = useState(item.status ?? "nra");
  const [revision, setRevision] = useState(item.revision ?? 0);

  const dateInputRef = useRef(null);
  const { updateProject, error, success, reset } = useUpdateProject();

  const setProjectStates = (updatedItem) => {
    setSelectedDepartmentId(updatedItem.department_id ?? null);
    setSelectedTeamId(updatedItem.team_id ?? null);
    setDate(updatedItem.deli_last_date ?? "");
    setExtension(updatedItem.extension ?? 0);
    setSaleComment(updatedItem.sales_comments ?? "");
    setOperationComment(updatedItem.opsleader_comments ?? "");
    setOpstatus(updatedItem.ops_status ?? "nra");
    setSastatus(updatedItem.status ?? "nra");
    setRevision(updatedItem.revision ?? 0);
    setProfileId(updatedItem.profile_id);
    setSalesId(updatedItem.ordered_by);
    setMeeting(updatedItem?.sales_comments.toLowerCase().includes("meeting"));
  };

  const sales = useSalesMembers(socket);

  const { departments, teams, profiles } = useSocketData(
    socket,
    selectedDepartmentId,
    selectedTeamId,
    item,
    setProjectStates,
  );

  useEffect(() => {
    if (success) {
      toast.success("Update Successful");
      reset();
    }

    if (error) {
      toast.warning("Update Failed");
      reset();
    }
  }, [success, error, reset]);

  const handleUpdate = (data) => updateProject(item.id, data);

  const departmentHandler = (e) => {
    const department_id = parseInt(e.target.value);
    setSelectedDepartmentId(department_id);
    setSelectedTeamId(null);
    handleUpdate({ department_id, team_id: null });
  };

  const teamHandler = (e) => {
    const team_id = parseInt(e.target.value);
    setSelectedTeamId(team_id);
    handleUpdate({ team_id });
  };

  const profileHandler = (e) => {
    const profileIds = parseInt(e.target.value);
    setProfileId(profileIds);
    handleUpdate({ profile_id: profileIds });
  };

  const salesHandler = (e) => {
    const salesIds = parseInt(e.target.value);
    setSalesId(salesIds);
    handleUpdate({ ordered_by: salesIds });
  };

  const dateHandler = async (currentDate) => {
    setExtension((prev) => prev + 1);
    setDate(currentDate);
    await handleUpdate({ deli_last_date: currentDate, extension });
    refetch();
  };

  function useDebouncedCommentHandler(handleUpdate) {
    const debouncedFns = useRef({});

    const getHandler = (key) => {
      if (!debouncedFns.current[key]) {
        debouncedFns.current[key] = debounce((value) => {
          handleUpdate({ [key]: value });
        }, 1200);
      }

      return debouncedFns.current[key];
    };

    const commentHandler = (key, valueSetter) => (e) => {
      const value = e.target.value;
      valueSetter(value);
      getHandler(key)(value);
    };
    return commentHandler;
  }

  const commentHandler = useDebouncedCommentHandler(handleUpdate);

  const statusHandler = async (type, newStatus) => {
    if (type == "op") {
      setOpstatus(newStatus);
      await handleUpdate({ ops_status: newStatus });
    } else {
      setSastatus(newStatus);
      refetch();
      if (newStatus == "delivered") {
        await handleUpdate({
          status: newStatus,
          is_delivered: true,
          delivery_date: new Date().toISOString().split("T")[0],
        });
        refetch();
        exports.getTodayTask = async (req, res) => {
          try {
            const { uid } = req.user;
            const me = await prisma.team_member.findUnique({
              where: { uid },
              include: { team: true },
            });
            if (!me || !me.role?.startsWith("operation_"))
              return res.status(403).json({ error: "Access denied" });

            const rows = await prisma.today_task.findMany({
              where: {
                project: { is_delivered: false },
                ...(me.role === "operation_leader"
                  ? { team_id: me.team_id }
                  : { team_member_id: me.id }),
              },
              include: {
                project: { select: { update_at: true, deli_last_date: true } },
                team_member: {
                  select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    role: true,
                  },
                },
              },
              orderBy: { project: { update_at: "desc" } },
            });

            const tasks = Object.values(
              rows.reduce((acc, row) => {
                const pid = row.project_id;
                if (!acc[pid]) {
                  acc[pid] = {
                    project_id: pid,
                    client_name: row.client_name,
                    expected_finish_time: row.expected_finish_time,
                    last_update: row.project?.update_at,
                    deli_last_date: row.project?.deli_last_date,
                    assign: [],
                  };
                }

                const assigneeObj = row.team_member
                  ? { ...row.team_member, ops_status: row.ops_status }
                  : {
                      id: null,
                      first_name: null,
                      last_name: null,
                      email: null,
                      role: null,
                      ops_status: row.ops_status,
                    };

                acc[pid].assign.push(assigneeObj);
                return acc;
              }, {}),
            );

            let teamMembers = [];
            if (me.role === "operation_leader") {
              teamMembers = await prisma.team_member.findMany({
                where: { team_id: me.team_id },
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                  role: true,
                },
              });
            }

            return res.json(
              me.role === "operation_leader"
                ? { tasks, team_members: teamMembers }
                : { tasks },
            );
          } catch (err) {
            console.error("getTodayTask →", err);
            return res.status(500).json({ error: "Internal server error" });
          }
        };
      } else if (newStatus === "realrevision") {
        setRevision((prev) => prev + 1);
        await handleUpdate({ status: newStatus, revision: revision + 1 });
      } else {
        await handleUpdate({ status: newStatus });
      }
    }
  };

  const statusObj = {
    revision: "bg-red-500",
    realrevision: "bg-red-500",
    complete: "bg-green-700",
    wip: "bg-yellow-500",
    delivered: "bg-pink-600",
    submitted: "bg-blue-600",
    nra: "bg-black",
    cancelled: "bg-red-500",
    client_Update: "bg-blue-900",
  };
  // const navigate = useNavigate();

  console.log(item);

  return (
    <tr
      className={`${
        item.status?.toLowerCase() === "cancelled"
          ? "bg-red-500 text-white"
          : theme === "light-mode"
            ? "even:bg-primary/92 odd:bg-primary"
            : "even:bg-primary/20 odd:bg-primary"
      }`}
    >
      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">
          <a href={item?.sheet_link} target="blank">
            {item.clientName}
          </a>
        </p>

        {/* <p className="p-2">{item.order_id}</p> */}

        <p className="p-2">
          <Link to={`/dashboard/projectsdetails/${item.id}`}>
            {item.order_id}
          </Link>
        </p>
      </td>

      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <select
          onChange={departmentHandler}
          value={selectedDepartmentId ?? ""}
          className={`w-full p-2 pl-5 ${roleBasePermissionOne && "appearance-none"}`}
          disabled={roleBasePermissionOne}
        >
          {departments?.map((d) => (
            <option key={d.id} value={d.id} className="bg-primary">
              {d.department_name}
            </option>
          ))}
        </select>
        <br />
        <select
          onChange={teamHandler}
          value={selectedTeamId ?? ""}
          className={`border-accent/20 w-full border-t-1 p-2 pl-5 ${roleBasePermissionOne && "appearance-none"}`}
          disabled={roleBasePermissionOne}
        >
          <option className="bg-primary" value="">
            Select Team
          </option>
          {teams?.map((t) => (
            <option key={t.id} value={t.id} className="bg-primary">
              {t.team_name}
            </option>
          ))}
        </select>
      </td>

      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p className="p-2">{item.order_amount}</p>
        <p className="p-2">{item.after_fiverr_amount}</p>
      </td>

      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <p
          className={`${statusObj[opstatus]} flex ${roleBasePermissionTwo ? "gap-1 pl-6" : "justify-evenly"} p-2`}
        >
          OP :
          <select
            className={`${statusObj[opstatus]} focus:outline-none ${roleBasePermissionTwo && "appearance-none"}`}
            onChange={(e) => statusHandler("op", e.target.value)}
            value={opstatus}
            disabled={roleBasePermissionTwo}
          >
            {Object.keys(statusObj).map((status) => (
              <option key={status} value={status}>
                {status.toUpperCase()}
              </option>
            ))}
          </select>
        </p>
        <p
          className={`${statusObj[sastatus]} border-accent/20 flex justify-evenly border-t-1 p-2`}
        >
          SA :
          <select
            className={`${statusObj[sastatus]} focus:outline-none ${roleBasePermissionOne && "appearance-none"}`}
            onChange={(e) => statusHandler("sa", e.target.value)}
            value={sastatus}
            disabled={roleBasePermissionOne}
          >
            {Object.keys(statusObj).map((status) => (
              <option key={status} value={status}>
                {status === "realrevision"
                  ? "Real Revision"
                  : status.toUpperCase()}
              </option>
            ))}
          </select>
        </p>
      </td>

      <td
        className={`${days < 0 ? "bg-red-600" : ""} border text-left text-sm font-semibold whitespace-nowrap`}
      >
        <div className="p-2">
          {show ? (
            <div
              className="w-full"
              onClick={() => !roleBasePermissionOne && setShow(false)}
            >
              <div className="flex cursor-pointer items-center justify-between">
                {date}
                {!roleBasePermissionOne && <FiCalendar className="h-5 w-5" />}
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <input
                ref={dateInputRef}
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="border-amber-500 focus:ring-2 focus:ring-amber-500"
                disabled={roleBasePermissionOne}
              />

              <FaCheckSquare
                onClick={() => {
                  if (date !== item.deli_last_date) dateHandler(date);
                  setShow(true);
                }}
                className="h-5 w-5 cursor-pointer"
              />
            </div>
          )}
        </div>
        <p className="border-accent/20 border-t-1 p-2">{`D : ${days}, H : ${hours}`}</p>
      </td>

      <td className="border text-left text-sm font-semibold whitespace-nowrap">
        <select
          onChange={profileHandler}
          value={profileId ?? ""}
          className={`w-full p-2 pl-5 ${roleBasePermissionOne && "appearance-none"}`}
          disabled={roleBasePermissionOne}
        >
          {profiles?.map((profile) => (
            <option key={profile.id} value={profile.id} className="bg-primary">
              {profile.profile_name}
            </option>
          ))}
        </select>
        <br />
        <select
          onChange={salesHandler}
          value={salesId ?? ""}
          className={`border-accent/20 w-full border-t-1 p-2 pl-5 ${roleBasePermissionOne && "appearance-none"}`}
          disabled={roleBasePermissionOne}
        >
          <option className="bg-primary" value="">
            Select Team
          </option>
          {sales?.map((sale) => (
            <option key={sale.id} value={sale.id} className="bg-primary">
              {sale.name}
            </option>
          ))}
        </select>
      </td>

      <td
        className={`${meeting && "bg-red-500"} border px-2 py-1 text-left text-sm font-semibold whitespace-nowrap`}
      >
        <textarea
          rows="2"
          value={saleComment}
          disabled={roleBasePermissionOne}
          onChange={commentHandler("sales_comments", setSaleComment)}
          className="w-full border-transparent p-2 focus:border-blue-500 focus:outline-none"
        />
      </td>

      <td className="border px-2 py-1 text-left text-sm font-semibold whitespace-nowrap">
        <textarea
          rows="2"
          disabled={roleBasePermissionTwo}
          value={operationComment}
          onChange={commentHandler("opsleader_comments", setOperationComment)}
          className="w-full border-transparent p-2 focus:border-blue-500 focus:outline-none"
        />
      </td>
    </tr>
  );
}

export default SingleDeshboardProject;
