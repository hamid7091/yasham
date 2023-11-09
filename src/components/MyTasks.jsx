import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import fetchData from "../util-functions/fetchData";
import ActiveTasks from "./ActiveTasks";
import ClientAssignedCard from "./ClientAssignedCard";
import Message from "../micro-components/Message";

const MyTasks = ({ aactiveTasks, aassignedTasks, isDash }) => {
  console.log(isDash);
  console.log(aactiveTasks);
  console.log(aassignedTasks);

  const accessToken = window.localStorage.getItem("AccessToken");
  const [activeTasks, setActiveTasks] = useState(aactiveTasks);
  const [assignedTasks, setAssignedTasks] = useState(aassignedTasks);

  const myTasksURL = "https://samane.zbbo.net/api/v1/task/my_tasks";
  const myTasksHeader = new Headers();
  myTasksHeader.append("Authorization", `Bearer ${accessToken}`);
  const myTasksRequestOptions = {
    method: "POST",
    headers: myTasksHeader,
    redirect: "follow",
  };

  const getMyTasksData = async () => {
    const response = await fetchData(myTasksURL, myTasksRequestOptions);
    console.log(response);
    setActiveTasks(response.activeTasks);
    setAssignedTasks(response.assignedTasks);
  };

  useEffect(() => {
    !isDash && getMyTasksData();
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
