import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ClientAssignedCard from "./ClientAssignedCard";
import SingleHeader from "./SingleHeader";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import Message from "../micro-components/Message";
import useAuth from "../micro-components/useAuth";

const SingleGroup = () => {
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [tabState, setTabState] = useState("allTasksTab");
  const [departmentDetails, setDepartmentDetails] = useState();
  const [tasks, setTasks] = useState([]);
  const [orphanTasks, setOrphanTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);

  const getData = async () => {
    const formdata = new FormData();
    formdata.append("departmentID", param.id);
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/department/single", formdata);
      console.log(response.data.response);
      response.data.response.tasks && setTasks(response.data.response.tasks);
      setDepartmentDetails(response.data.response.departmentDetail);
      response.data.response.tasks &&
        response.data.response.tasks.forEach((task) => {
          task.isAssigned &&
            setAssignedTasks((prevTask) => [...prevTask, task]);
          !task.isAssigned && setOrphanTasks((prevTask) => [...prevTask, task]);
        });
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  const { isLoading, hasAccess, isReady } = useAuth(["supervisor"]);

  useEffect(() => {
    isReady && !isLoading && !hasAccess && navigate("/unauthorized");
  }, [isLoading, isReady]);

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getData();
    }
  }, []);
  const handleTabChange = (e) => {
    const clicked = e.target;
    const clickedA = e.target.nextElementSibling;
    const clickedB = e.target.previousElementSibling;
    clicked.classList.add("active-tab");
    if (clickedA && clickedB) {
      clickedA.classList.remove("active-tab");
      clickedB.classList.remove("active-tab");
      setTabState("orphanTasksTab");
    }
    if (clickedA === null) {
      clickedB.classList.remove("active-tab");
      clickedB.previousElementSibling.classList.remove("active-tab");
      setTabState("assignedTasksTab");
    }
    if (clickedB === null) {
      clickedA.classList.remove("active-tab");
      clickedA.nextElementSibling.classList.remove("active-tab");
      setTabState("allTasksTab");
    }
  };
  return (
    <div className="container px-3 mt-100" dir="rtl">
      <SingleHeader
        title={`بخش ${
          departmentDetails?.departmentName
            ? departmentDetails.departmentName
            : "..."
        }`}
        location={location.state}
      />
      <div className="log-in-tabs bg-white d-flex justify-content-between align-items-center rounded-pill text-center p-2 mx-2 mt-2 drop-shadow">
        <span
          className="active-tab flex-fill py-2 px-1 has-pointer"
          onClick={(event) => handleTabChange(event)}
        >
          کل
        </span>
        <span
          className="flex-fill py-2 px-1 has-pointer"
          onClick={(event) => handleTabChange(event)}
        >
          در انتظار
        </span>
        <span
          className="flex-fill py-2 px-1 has-pointer"
          onClick={(event) => handleTabChange(event)}
        >
          در حال انجام
        </span>
      </div>
      {tabState === "allTasksTab" &&
        (tasks.length ? (
          tasks.map((task, index) => {
            return <ClientAssignedCard key={index} order={task} />;
          })
        ) : (
          <Message>وظیفه ای ثبت نشده است</Message>
        ))}
      {tabState === "orphanTasksTab" &&
        (orphanTasks.length ? (
          orphanTasks.map((task, index) => {
            return <ClientAssignedCard key={index} order={task} />;
          })
        ) : (
          <Message>وظیفه ای برای واگذاری وجود ندارد</Message>
        ))}
      {tabState === "assignedTasksTab" &&
        (assignedTasks.length ? (
          assignedTasks.map((task, index) => {
            return <ClientAssignedCard key={index} order={task} />;
          })
        ) : (
          <Message>وظیفه ای واگذار نشده است</Message>
        ))}
    </div>
  );
};

export default SingleGroup;
