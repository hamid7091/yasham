// import React from "react";
// import GrayCalander from "../assets/svg-icons/GrayCalander";
// import BackIcon from "../assets/svg-icons/BackIcon";
// import useDate from "../micro-components/useDate2";
// import ProfileIcon from "../assets/svg-icons/ProfileIcon";
// import ClientIcon from "../assets/svg-icons/ClientIcon";
// import { Link } from "react-router-dom";

// const AssignedTasks = (taskInfo) => {
//   console.log(taskInfo.taskInfo);
//   const date = useDate(taskInfo.taskInfo.date);

//   return (
//     <Link
//       className="has-pointer py-5"
//       to={`/task/${taskInfo.taskInfo.taskID}`}
//       state={taskInfo}
//     >
//       <div className="drop-shadow bg-white rounded-5 d-flex align-items-center justify-content-between py-4 mb-3">
//         <div className="pe-4">
//           <h5 className="grey-large-bold pb-2">
//             <span>
//               <ProfileIcon />
//             </span>{" "}
//             <span>{taskInfo.taskInfo.patientFullName}</span>
//           </h5>
//           <h5 className="lgrey-default-thin d-flex align-items-center gap-1 mb-0">
//             <span>
//               <ClientIcon />
//             </span>{" "}
//             <p className="mb-0">{taskInfo.taskInfo.client} </p>
//             {"  "}
//             <span>
//               <GrayCalander />
//             </span>
//             <p className="mb-0">{date}</p>
//           </h5>
//         </div>
//         <div className="ps-3">
//           <BackIcon />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default AssignedTasks;
