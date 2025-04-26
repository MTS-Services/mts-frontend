import { useCurrentTime } from "../../../hooks/useCurrentTime";

function SingleDeshboardProject({ item }) {
  console.log(item);
  const { days, hours } = useCurrentTime(item.deli_last_date);
  return (
    <tr className="odd:bg-primary text-accent even:bg-primary/20">
      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <p>{item.clientName}</p>
        <p># {item.id}</p>
      </td>
      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <p>{item.department.department_name}</p>
        <select>
          <option>Arafat Team</option>
          <option>Areefin Team</option>
          <option>JONI Team</option>
        </select>
      </td>
      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <p>{item.order_amount}</p>
        <p>{item.after_fiverr_amount}</p>
      </td>

      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <p>
          OP :{" "}
          <select>
            <option>Revision</option>
            <option>Complete</option>
            <option>Wip</option>
            <option>Delivered</option>
            <option>Submitted</option>
          </select>
        </p>
        <p>
          SA :{" "}
          <select>
            <option>Revision</option>
            <option>Complete</option>
            <option>Wip</option>
            <option>Delivered</option>
            <option>Submitted</option>
          </select>
        </p>
      </td>
      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <p>{item.deli_last_date}</p>
        <p>{`D : ${days} , H : ${hours}`}</p>
      </td>
      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <p>{item.profile_id}</p>
        <p>{item.ordered_by}</p>
      </td>
      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <input type="textarea" />
      </td>
      <td className="border px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
        <input type="textarea" />
      </td>
    </tr>
  );
}

export default SingleDeshboardProject;
