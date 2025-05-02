import { BsPersonWorkspace, BsQuestionDiamondFill } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FiPlusSquare } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";

import { useFetchData } from "../../../hooks/useFetchData";
import SingleDeshboardProject from "./SingleDeshboardProject";
function AllProjects() {
  // Fetch project data

  const { data, refetch, loading } = useFetchData(
    "http://192.168.10.47:3000/api/project",
  );

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

  const profileName = data?.projects?.map(
    (item) => item.department.department_name,
  );
  console.log(profileName);

  return (
    <section>
      <div className="font-secondary w-full overflow-x-auto p-4">
        <div className="border-accent/30 flex gap-5 border-b-1 pb-7">
          <div className="group relative">
            <div className="bg-primary border-accent flex cursor-pointer rounded border-3 px-2 py-3">
              <div className="border-accent/5 flex items-center border-r-1 pr-2">
                <RiUserFill className="h-7 w-7" />
              </div>
              <div className="mr-2 ml-1 px-2 pt-3 pr-5">
                <span className="absolute top-3 right-3">
                  <BsQuestionDiamondFill className="w-5" />
                </span>
                <h1 className="text-lg">Total Operation</h1>
                <p className="py-2 text-2xl">$ 1000</p>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 z-50 mt-2 hidden w-[200px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm text-white opacity-0 shadow-md transition-all duration-200 group-hover:block group-hover:opacity-100">
              This shows the total operation amount earned this month by the
              operations team.
            </div>
          </div>
          <div className="group relative">
            <div className="bg-primary border-accent flex cursor-pointer rounded border-3 px-2 py-3">
              <div className="border-accent/5 flex items-center border-r-1 pr-2">
                <RiUserFill className="h-7 w-7" />
              </div>
              <div className="mr-2 ml-1 px-2 pt-3 pr-5">
                <span className="absolute top-3 right-3">
                  <BsQuestionDiamondFill className="w-5" />
                </span>
                <h1 className="text-lg">Total Operation</h1>
                <p className="py-2 text-2xl">$ 1000</p>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 z-50 mt-2 hidden w-[200px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm text-white opacity-0 shadow-md transition-all duration-200 group-hover:block group-hover:opacity-100">
              This shows the total operation amount earned this month by the
              operations team.
            </div>
          </div>
          <div className="group relative">
            <div className="bg-primary border-accent flex cursor-pointer rounded border-3 px-2 py-3">
              <div className="border-accent/5 flex items-center border-r-1 pr-2">
                <RiUserFill className="h-7 w-7" />
              </div>
              <div className="mr-2 ml-1 px-2 pt-3 pr-5">
                <span className="absolute top-3 right-3">
                  <BsQuestionDiamondFill className="w-5" />
                </span>
                <h1 className="text-lg">Total Operation</h1>
                <p className="py-2 text-2xl">$ 1000</p>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 z-50 mt-2 hidden w-[200px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm text-white opacity-0 shadow-md transition-all duration-200 group-hover:block group-hover:opacity-100">
              This shows the total operation amount earned this month by the
              operations team.
            </div>
          </div>
          <div className="group relative">
            <div className="bg-primary border-accent flex cursor-pointer rounded border-3 px-2 py-3">
              <div className="border-accent/5 flex items-center border-r-1 pr-2">
                <RiUserFill className="h-7 w-7" />
              </div>
              <div className="mr-2 ml-1 px-2 pt-3 pr-5">
                <span className="absolute top-3 right-3">
                  <BsQuestionDiamondFill className="w-5" />
                </span>
                <h1 className="text-lg">Total Operation</h1>
                <p className="py-2 text-2xl">$ 1000</p>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 z-50 mt-2 hidden w-[200px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm text-white opacity-0 shadow-md transition-all duration-200 group-hover:block group-hover:opacity-100">
              This shows the total operation amount earned this month by the
              operations team.
            </div>
          </div>
          <div className="group relative">
            <div className="bg-primary border-accent flex cursor-pointer rounded border-3 px-2 py-3">
              <div className="border-accent/5 flex items-center border-r-1 pr-2">
                <RiUserFill className="h-7 w-7" />
              </div>
              <div className="mr-2 ml-1 px-2 pt-3 pr-5">
                <span className="absolute top-3 right-3">
                  <BsQuestionDiamondFill className="w-5" />
                </span>
                <h1 className="text-lg">Total Operation</h1>
                <p className="py-2 text-2xl">$ 1000</p>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 z-50 mt-2 hidden w-[200px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm text-white opacity-0 shadow-md transition-all duration-200 group-hover:block group-hover:opacity-100">
              This shows the total operation amount earned this month by the
              operations team.
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-5 pt-7">
          <div className="flex gap-5">
            <div className="bg-primary border-accent flex rounded border-2 p-2">
              <div className="bg-primary border-accent/30 flex items-center border-r-1 pr-2">
                <RiUserFill />
              </div>
              <select className="bg-primary font-secondary border-accent/40 mr-2 ml-3 border px-3 focus:outline-0">
                {profileName?.map((item) => (
                  <option className="p-2">{item}</option>
                ))}
              </select>
            </div>
            <div className="bg-primary border-accent flex rounded border-2 p-2">
              <div className="bg-primary border-accent/30 flex items-center border-r-1 pr-2">
                <MdGroups />
              </div>
              <select className="bg-primary font-secondary border-accent/40 mr-2 ml-3 border px-3 focus:outline-0">
                {profileName?.map((item) => (
                  <option className="p-2">{item}</option>
                ))}
              </select>
            </div>
            <div className="bg-primary border-accent flex rounded border-2 p-2">
              <div className="bg-primary border-accent/30 flex items-center border-r-1 pr-2">
                <BsPersonWorkspace />
              </div>
              <select className="bg-primary font-secondary border-accent/40 mr-2 ml-3 border px-3 focus:outline-0">
                {profileName?.map((item) => (
                  <option className="p-2">{item}</option>
                ))}
              </select>
            </div>
            <div className="bg-primary border-accent flex rounded border-2 p-2">
              <div className="bg-primary border-accent/30 flex items-center border-r-1 pr-2">
                <FaHandHoldingDollar />
              </div>
              <select className="bg-primary font-secondary border-accent/40 mr-2 ml-3 border px-3 focus:outline-0">
                {profileName?.map((item) => (
                  <option className="p-2">{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="font-secondary flex items-center justify-end gap-5">
            <div className="border-accent bg-secondary flex cursor-pointer rounded border-2 p-2 duration-150 hover:scale-95">
              <div className="border-accent/30 flex items-center border-r-1 pr-2">
                <FiPlusSquare className="cursor-pointer" />
              </div>
              <button className="cursor-pointer px-2">Add New Project</button>
            </div>

            <div className="border-accent bg-secondary flex items-center justify-between gap-3 rounded border-2 p-2 duration-150 hover:scale-95">
              {/* Search Bar */}
              <div className="border-accent/30 flex items-center rounded border bg-white px-2 py-1">
                <input
                  type="text"
                  placeholder="Search project..."
                  className="text-background w-full bg-transparent text-sm outline-none"
                />
              </div>

              {/* Add Button */}
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
            {data?.projects?.map((item, index) => (
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

export default AllProjects;
