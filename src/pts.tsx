// // src/components/ProjectDetails.js
// import React from 'react';


// import { useFetchData } from './hooks/useFetchData';

// export default function ProjectDetails() {

//   const { data, loading, refetch } = useFetchData(
//     'https://mtsbackend20-production.up.railway.app/api/project/getall/1'
//   );

//   if (loading) return <p>Loading...</p>;
//   if (!data || !data.project) return <p>No project found.</p>;

//   const project = data.project;
//   console.log("kdfjasfjas;kfjasdfjas",project)

//   return (
//     <div className="project-container">
//       <h2>📁 {project.project_name}</h2>
//       <p><strong>🗓 Date:</strong> {project.date}</p>
//       <p><strong>📝 Sales Comments:</strong> {project.sales_comments}</p>
//       <p><strong>👨‍💼 Ops Comments:</strong> {project.opsleader_comments}</p>
//       <p><strong>📎 Sheet:</strong> <a href={project.sheet_link} target="_blank" rel="noreferrer">Open</a></p>
//       <p><strong>💰 Order Amount:</strong> ${project.order_amount}</p>
//       <p><strong>⭐ Rating:</strong> {project.rating}</p>
//       <p><strong>🚦 Status:</strong> {project.status}</p>

//       <h3>👨‍👩‍👦 Team Members:</h3>
//       <ul className="team-list">
//         {project.team?.team_member?.map(member => (
//           <li key={member.id}>
//             <img src={member.dp} alt={member.first_name} className="profile-pic" />
//             <div>
//               <strong>{member.first_name} {member.last_name}</strong><br />
//               <small>Role: {member.role}</small><br />
//               <small>Email: {member.email}</small>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <button onClick={refetch} className="refresh-btn">🔁 Refresh Data</button>
//     </div>
//   );
// }
