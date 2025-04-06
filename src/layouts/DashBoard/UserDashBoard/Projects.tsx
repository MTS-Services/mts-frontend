const Projects = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max border-separate border-spacing-y-2 text-left">
        <thead>
          <tr className="bg-secondary text-white text-sm rounded-2xl">
            <th className="px-2 py-3 rounded-tl-sm rounded-bl-sm">Order-ID</th>
            <th className="px-2 py-3 border-x border-primary">Date</th>
            <th className="px-2 py-3 border-r border-primary">Account</th>
            <th className="px-2 py-3 border-r border-primary">Project Name</th>
            <th className="px-2 py-3 border-r border-primary">Client Name</th>
            <th className="px-2 py-3 border-r border-primary">Operation-Status</th>
            <th className="px-2 py-3 border-r border-primary">Sheet link</th>
            <th className="px-2 py-3 border-r border-primary">Ordered by</th>
            <th className="px-2 py-3 border-r border-primary">Delivery Last Date</th>
            <th className="px-2 py-3 border-r border-primary">Profile Status</th>
            <th className="px-2 py-3 border-r border-primary">Order Amount</th>
            <th className="px-2 py-3 border-r border-primary">After Fiverr</th>
            <th className="px-2 py-3 border-r border-primary">Bonus</th>
            <th className="px-2 py-3 border-r border-primary rounded-tr-sm rounded-br-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-primary text-white text-sm rounded-2xl shadow-box-style hover:shadow-box-style hover:shadow-border-color transition-all duration-300 ease-in-out transform">
            <td className="px-2 py-3 rounded-tl-sm rounded-bl-sm">#MTS347876</td>
            <td className="px-2 py-3 border-x border-secondary">20.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Web Insider</td>
            <td className="px-2 py-3 border-r border-secondary">In Progress</td>
            <td className="px-2 py-3 border-r border-secondary">Darkanat08</td>
            <td className="px-2 py-3 border-r border-secondary">Wip</td>
            <td className="px-2 py-3 border-r border-secondary">google.com</td>
            <td className="px-2 py-3 border-r border-secondary">Rakib</td>
            <td className="px-2 py-3 border-r border-secondary">30.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Working</td>
            <td className="px-2 py-3 border-r border-secondary">$200</td>
            <td className="px-2 py-3 border-r border-secondary">$160</td>
            <td className="px-2 py-3 border-r border-secondary">0</td>
            <td className="px-2 py-3 border-r border-secondary rounded-tr-sm rounded-br-sm">5</td>
          </tr>
          <tr className="bg-primary text-white text-sm rounded-2xl shadow-box-style hover:shadow-box-style hover:shadow-border-color transition-all duration-300 ease-in-out transform">
            <td className="px-2 py-3 rounded-tl-sm rounded-bl-sm">#MTS347876</td>
            <td className="px-2 py-3 border-x border-secondary">20.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Web Insider</td>
            <td className="px-2 py-3 border-r border-secondary">In Progress</td>
            <td className="px-2 py-3 border-r border-secondary">Darkanat08</td>
            <td className="px-2 py-3 border-r border-secondary">Wip</td>
            <td className="px-2 py-3 border-r border-secondary">google.com</td>
            <td className="px-2 py-3 border-r border-secondary">Rakib</td>
            <td className="px-2 py-3 border-r border-secondary">30.10.2025</td>
            <td className="px-2 py-3 border-r border-secondary">Working</td>
            <td className="px-2 py-3 border-r border-secondary">$200</td>
            <td className="px-2 py-3 border-r border-secondary">$160</td>
            <td className="px-2 py-3 border-r border-secondary">0</td>
            <td className="px-2 py-3 border-r border-secondary rounded-tr-sm rounded-br-sm">5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
