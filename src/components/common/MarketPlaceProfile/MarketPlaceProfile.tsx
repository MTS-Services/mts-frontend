import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaStar, FaUserTie, FaExternalLinkAlt } from "react-icons/fa";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";

const MarketPlaceProfile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  // Enhanced freelancer data with marketplace services
  const freelancers = [
    {
      id: 1,
      name: "Mukta",
      platform: "Fiverr",
      skills: ["WordPress Development", "Elementor", "WooCommerce"],
      rating: 4.9,
      completedJobs: 127,
      profileLink: "https://fiverr.com/mukta",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      services: [
        "WordPress Website Design",
        "Elementor Page Builder Customization",
        "WooCommerce Store Setup"
      ]
    },
    {
      id: 2,
      name: "Raihan",
      platform: "Upwork",
      skills: ["React Development", "Node.js", "MERN Stack"],
      rating: 4.7,
      completedJobs: 89,
      profileLink: "https://upwork.com/raihan",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      services: [
        "React Single Page Applications",
        "Node.js API Development",
        "Full Stack MERN Solutions"
      ]
    },
    {
      id: 3,
      name: "Prince",
      platform: "Fiverr",
      skills: ["SEO Optimization", "Google Ads", "Social Media Marketing"],
      rating: 5.0,
      completedJobs: 215,
      profileLink: "https://fiverr.com/prince",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      services: [
        "On-Page SEO Optimization",
        "Google Ads Campaign Management",
        "Social Media Strategy"
      ]
    },
    {
      id: 4,
      name: "Joni",
      platform: "Upwork",
      skills: ["Content Writing", "Copywriting", "Technical Writing"],
      rating: 4.8,
      completedJobs: 156,
      profileLink: "https://upwork.com/joni",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      services: [
        "Website Content Writing",
        "Product Description Copywriting",
        "Technical Documentation"
      ]
    },
  ];

  // Get all unique skills for filter dropdown
  const allSkills = [...new Set(freelancers.flatMap(f => f.skills))];

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const matchesSearch = 
      freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.skills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      freelancer.services.some(service =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesPlatform = 
      selectedPlatform === "" || 
      freelancer.platform.toLowerCase() === selectedPlatform.toLowerCase();

    const matchesSkill = 
      selectedSkill === "" || 
      freelancer.skills.some(skill => 
        skill.toLowerCase().includes(selectedSkill.toLowerCase())
      );

    return matchesSearch && matchesPlatform && matchesSkill;
  });

  const tableHeaders = [
  
    "Name",
    "Platform",
    "Skills",
    "Services",
   
    "Completed Jobs",
    "Profile Link"
  ];

  return (
    <div className="bg-background min-h-screen w-full overflow-x-auto px-6 py-10 sm:px-4 md:px-10 lg:px-14">
      {/* Search and Filter Section */}
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="border-border-color bg-secondary flex items-center justify-between gap-3 rounded border-2 p-2 duration-150 hover:scale-95">
          <div className="border-border-color/30 flex items-center rounded border bg-white px-2 py-1">
            <FaSearch className="text-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Search freelancers..."
              className="text-primary w-full bg-transparent text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:w-auto">
          {/* Platform Filter */}
          <div className="bg-primary border-border-color flex rounded border-2 p-2">
            <div className="bg-primary border-border-color/30 flex items-center border-r-1 pr-2">
              <FaUserTie className="text-2xl" />
            </div>
            <select
              className="bg-primary font-secondary border-border-color/40 mr-2 ml-3 border px-3 focus:outline-0"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="">All Platforms</option>
              <option value="Fiverr">Fiverr</option>
              <option value="Upwork">Upwork</option>
            </select>
          </div>

          {/* Skill Filter */}
          <div className="bg-primary border-border-color flex rounded border-2 p-2">
            <div className="bg-primary border-border-color/30 flex items-center border-r-1 pr-2">
              <FaStar className="text-2xl" />
            </div>
            <select
              className="bg-primary font-secondary border-border-color/40 mr-2 ml-3 border px-3 focus:outline-0"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">All Skills</option>
              {allSkills.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Freelancers Table */}
      <div className="mt-10 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500">
            <Loading />
          </div>
        ) : (
          <table className="w-full min-w-[1200px] text-left">
            <thead>
              <tr className="text-accent font-primary text-lg">
                {tableHeaders.map((head, i) => (
                  <th
                    key={head}
                    className={`px-2 py-1 text-lg ${i === 0 ? "py-3" : ""}`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-accent font-secondary border-t-2">
              {filteredFreelancers.length > 0 ? (
                filteredFreelancers.map((freelancer) => (
                  <tr
                    key={freelancer.id}
                    className="border-accent/40 font-secondary text-accent hover:bg-primary border-b text-sm hover:text-white"
                  >
                    {/* <td className="relative flex items-center justify-center px-2 py-2">
                      <div className="relative h-12 w-12 rounded-full">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src={freelancer.image}
                          alt={freelancer.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-profile.jpg";
                          }}
                        />
                      </div>
                    </td> */}

                    <td className="px-1 py-2 font-light">{freelancer.name}</td>
                    <td className="px-1 py-2 font-light">{freelancer.platform}</td>
                    
                    <td className="px-1 py-2 font-light">
                      <div className="flex flex-wrap gap-1">
                        {freelancer.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    
                    <td className="px-1 py-2 font-light">
                      <ul className="list-disc pl-4">
                        {freelancer.services.map((service, i) => (
                          <li key={i} className="text-xs">{service}</li>
                        ))}
                      </ul>
                    </td>
                    
                  
                    <td className="px-1 py-2 font-light">{freelancer.completedJobs}+</td>

                    <td className="px-1 py-2 font-light">
                      <a
                        href={freelancer.profileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 flex items-center"
                      >
                        Visit <FaExternalLinkAlt className="ml-1 text-sm" />
                      </a>
                    </td>


                    <td className="px-1 py-2 font-light">
                      <Link to={`/dashboard/profile-datails/`}>
                        <button className="font-primary bg-primary relative flex items-center overflow-hidden rounded-full border border-white px-2 py-2 text-base font-medium text-white uppercase shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-2 sm:text-sm md:px-4 lg:px-4">
                          View Info
                        </button>
                      </Link>
                    </td>

                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-red-500">
                    No freelancers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MarketPlaceProfile;