import { useFetchData } from "../../../hooks/useFetchData";
import SingleDeshboardProject from "./SingleDeshboardProject";

function AllProjects() {
  const data = useFetchData("http://192.168.10.47:3000/api/project", "POST", {
    page: "1",
    limit: "10",
  });

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

  console.log(data?.projects?.[0]); // safe optional chaining

  return (
    <div className="max-w-full overflow-x-auto p-4">
      <table className="min-w-[1000px] table-auto border-collapse">
        <thead className="sticky top-0 bg-gray-100">
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
        <tbody>
          {data.projects.map((item, index) => (
            <SingleDeshboardProject key={index} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProjects;
