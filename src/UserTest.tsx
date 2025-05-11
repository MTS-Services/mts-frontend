// import { useState } from "react";

// const UserTest = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUser, setEditedUser] = useState({
//     email: "test@example.com",
//     number: "1234567890",
//   });

//   const handleInputChange = (field, value) => {
//     setEditedUser((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <div className="p-4">
//       <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white px-4 py-2 mb-4">
//         {isEditing ? "Cancel" : "Edit"}
//       </button>

//       <div>
//         {["email", "number"].map((field) => (
//           <div key={field} className="mb-2">
//             <label>{field}: </label>
//             {isEditing ? (
//               <input
//                 value={editedUser[field] ?? ""}
//                 onChange={(e) => handleInputChange(field, e.target.value)}
//                 className="border p-1"
//               />
//             ) : (
//               <span>{editedUser[field]}</span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserTest;
