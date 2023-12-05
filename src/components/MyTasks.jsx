import React, { useEffect, useState } from "react";
import ActiveTasks from "./ActiveTasks";
import ClientAssignedCard from "./ClientAssignedCard";
import Message from "../micro-components/Message";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";
import { Navigate, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import useAuth from "../micro-components/useAuth";

const MyTasks = ({ activeTasks, assignedTasks, isDash }) => {
  const [activeTasksState, setActiveTasksState] = useState(activeTasks);
  const [assignedTasksState, setAssignedTasksState] = useState(assignedTasks);

  const navigate = useNavigate();

  const { isLoading, isError, errorItself, hasAccess } = useAuth(["employee"]);

  useEffect(() => {
    !isLoading && !hasAccess && navigate("/unauthorized");
  }, [isLoading]);

  const getMyTask = async () => {
    try {
      const response = await axiosInstance.post("/task/my_tasks");
      setActiveTasksState(response.data.response.activeTasks);
      setAssignedTasksState(response.data.response.assignedTasks);
      Loading.remove();
    } catch (error) {
      Loading.remove();
      console.error(error);
    }
  };

  useEffect(() => {
    !isDash ? getMyTask() : Loading.remove();
  }, []);

  console.log(assignedTasksState);

  return !isLoading ? (
    !isError ? (
      hasAccess ? (
        <div className="container px-3 mt-100" dir="rtl">
          {!isDash && <SingleHeader title={"وظایف من"} location={"/"} />}
          <div>
            <h4 className="bold-xxlarge m-3 px-2">وظیفه های فعال شما</h4>
            {activeTasksState ? (
              activeTasksState.map((activeTask) => {
                return (
                  <ActiveTasks key={activeTask.taskID} taskInfo={activeTask} />
                );
              })
            ) : (
              <Message>وظیفه فعال وجود ندارد</Message>
            )}
            <div className="assigned-tasks-container">
              <h4 className="bold-xxlarge m-3 px-2">وظیفه های شما</h4>
              {assignedTasksState && assignedTasksState?.length ? (
                assignedTasksState.map((assignedTask, index) => {
                  return (
                    <ClientAssignedCard key={index} order={assignedTask} />
                  );
                })
              ) : (
                <Message> وظیفه ای به شما اساین نشده</Message>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/unauthorized"} />
      )
    ) : (
      <ErrorPage error={errorItself} />
    )
  ) : (
    Loading.standard("در حال دریافت اطلاعات")
  );
};

export default MyTasks;
