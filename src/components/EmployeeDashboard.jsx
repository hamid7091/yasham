import React from "react";
import ActiveTasks from "./ActiveTasks";
import ClientAssignedCard from "./ClientAssignedCard";
import Message from "../micro-components/Message";

const EmployeeDashboard = ({ activeTasks, assignedTasks }) => {
  return (
    <>
      <h4 className="bold-xxlarge m-3 px-2">تسک های فعال شما</h4>
      {activeTasks ? (
        activeTasks?.map((activeTask) => {
          return <ActiveTasks key={activeTask.taskID} taskInfo={activeTask} />;
        })
      ) : (
        <Message>تسک فعال وجود ندارد</Message>
      )}
      <div className="assigned-tasks-container">
        <h4 className="bold-xxlarge m-3 px-2">تسک های شما</h4>
        {assignedTasks ? (
          assignedTasks?.map((assignedTask, index) => {
            return <ClientAssignedCard key={index} order={assignedTask} />;
          })
        ) : (
          <Message> تسکی به شما اساین نشده</Message>
        )}
      </div>
    </>
  );
};

export default EmployeeDashboard;
