import { FaUser, FaBriefcase, FaCalendarAlt, FaBuilding, FaMoneyBillWave, FaProjectDiagram, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EmployeeSummary = () => {
  const employee = {
    name: 'Liam Smith',
    role: 'Software Engineer',
    teamLead: 'Sophia Brown',
    department: 'Development',
    salary: 75000,
    totalWorkingDays: 250,
    leaveTaken: 18,
    leaveBalance: 7,
    projects: [
      { name: 'Inventory App', status: 'Completed' },
      { name: 'HR Portal', status: 'In Progress' },
      { name: 'CRM Tool', status: 'Completed' },
    ],
  };

  const dataCards = [
    { label: 'Name', value: employee.name, icon: <FaUser /> },
    { label: 'Role', value: employee.role, icon: <FaBriefcase /> },
    { label: 'Team Lead', value: employee.teamLead, icon: <FaUser /> },
    { label: 'Department', value: employee.department, icon: <FaBuilding /> },
    { label: 'Annual Salary', value: `$${employee.salary.toLocaleString()}`, icon: <FaMoneyBillWave /> },
    { label: 'Working Days', value: employee.totalWorkingDays, icon: <FaCalendarAlt /> },
    { label: 'Leaves Taken', value: employee.leaveTaken, icon: <FaCalendarAlt /> },
    { label: 'Leave Balance', value: employee.leaveBalance, icon: <FaCalendarAlt /> },
    { label: 'Total Projects', value: employee.projects.length, icon: <FaProjectDiagram /> },
  ];

  return (
    <div className="max-w-6xl mx-auto ">
      <h2 className="text-4xl font-bold text-center mb-10 text-accent  font-primary">Employee Summary</h2>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dataCards.map((item, index) => (
          <div key={index} className="bg-accnet/40 backdrop-blur-md border-1 border-primary shadow-lg rounded-xl p-4 text-accent">
            <div className="flex items-center mb-2">
              <div className="mr-2 text-accent font-secondary">{item.icon}</div>
              <p className="text-sm text-accent font-secondary">{item.label}</p>
            </div>
            <p className="text-lg font-semibold font-primary">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Project List */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-accent mb-3">Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employee.projects.map((project, index) => (
            <div
              key={index}
              className=" backdrop-blur-md border border-primary shadow-lg rounded-xl p-4 text-accent"
            >
              <div className="flex items-center mb-2">
                <FaProjectDiagram className="mr-2" />
                <p className="font-semibold">{project.name}</p>
              </div>
              <p className="text-sm text-accent">{project.status === 'Completed' ? <FaCheckCircle /> : <FaTimesCircle />} {project.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
