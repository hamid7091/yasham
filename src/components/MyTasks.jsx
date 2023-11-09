import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import ActiveTasks from "./ActiveTasks";
import ClientAssignedCard from "./ClientAssignedCard";
import Message from "../micro-components/Message";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";

const MyTasks = ({ aactiveTasks, aassignedTasks, isDash }) => {
  const [activeTasks, setActiveTasks] = useState(aactiveTasks);
  const [assignedTasks, setAssignedTasks] = useState(aassignedTasks);

  const getMyTaskAxios = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/task/my_tasks");
      console.log(response.data.response);
      setActiveTasks(response.data.response.activeTasks);
      setAssignedTasks(response.data.response.assignedTasks);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  useEffect(() => {
    !isDash && getMyTaskAxios();
  }, []);

  return (
    assignedTasks && (
      <div className="container px-3" dir="rtl">
        {!isDash && (
          <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
            <div className="bold-xlarge">وظایف من</div>
            <Link to="/">
              <BackArrow />
            </Link>
          </header>
        )}

        <h4 className="bold-xxlarge m-3 px-2">وظیفه های فعال شما</h4>
        {activeTasks ? (
          activeTasks?.map((activeTask) => {
            return (
              <ActiveTasks key={activeTask.taskID} taskInfo={activeTask} />
            );
          })
        ) : (
          <Message>وظیفه فعال وجود ندارد</Message>
        )}
        <div className="assigned-tasks-container">
          <h4 className="bold-xxlarge m-3 px-2">وظیفه های شما</h4>
          {assignedTasks ? (
            assignedTasks?.map((assignedTask, index) => {
              return <ClientAssignedCard key={index} order={assignedTask} />;
            })
          ) : (
            <Message> وظیفه ای به شما اساین نشده</Message>
          )}
        </div>
      </div>
    )
  );
};

export default MyTasks;
