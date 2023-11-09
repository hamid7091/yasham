import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import ClientAssignedCard from "./ClientAssignedCard";
import fetchData from "../util-functions/fetchData";

const SingleGroup = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const param = useParams();
  const [tabState, setTabState] = useState("allTasksTab");
  const [departmentDetails, setDepartmentDetails] = useState();
  const [tasks, setTasks] = useState([]);
  const [orphanTasks, setOrphanTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const responseMock = {
    departmentDetails: { departmentID: 1, departmentName: "قالب گیری" },
    tasks: [
      {
        taskID: 444,
        taskType: "Hard Night Guard",
        client: "دمو123",
        date: "1402-7-22",
        step: "گچ",
        percentage: 10,
        patientFullName: "معین لواری",
        isAssigned: true,
      },
      {
        taskID: 444,
        taskType: "Hard Night Guard",
        client: "دمو123",
        date: "1402-7-22",
        step: "گچ",
        percentage: 10,
        patientFullName: "معین لواری",
        isAssigned: true,
      },
      {
        taskID: 444,
        taskType: "Hard Night Guard",
        client: "دمو123",
        date: "1402-7-22",
        step: "گچ",
        percentage: 10,
        patientFullName: "معین لواری",
        isAssigned: true,
      },
      {
        taskID: 444,
        taskType: "Hard Night Guard",
        client: "دمو123",
        date: "1402-7-22",
        step: "گچ",
        percentage: 10,
        patientFullName: "معین لواری",
        isAssigned: false,
      },
      {
        taskID: 444,
        taskType: "Hard Night Guard",
        client: "دمو123",
        date: "1402-7-22",
        step: "گچ",
        percentage: 10,
        patientFullName: "معین لواری",
        isAssigned: false,
      },
      {
        taskID: 444,
        taskType: "Hard Night Guard",
        client: "دمو123",
        date: "1402-7-22",
        step: "گچ",
        percentage: 10,
        patientFullName: "معین لواری",
        isAssigned: false,
      },
      {
        taskID: 444,
        taskType: "Hard Night Guard",
        client: "دمو123",
        date: "1402-7-22",
        step: "گچ",
        percentage: 10,
        patientFullName: "معین لواری",
        isAssigned: false,
      },
    ],
  };

  const singleGroupURL = "https://samane.zbbo.net/api/v1/department/single";
  const singleGroupHeader = new Headers();
  singleGroupHeader.append("Authorization", `Bearer ${accessToken}`);
  const singleGroupFormdata = new FormData();
  singleGroupFormdata.append("departmentID", param.id);
  const singleGroupRequestOptions = {
    method: "POST",
    headers: singleGroupHeader,
    body: singleGroupFormdata,
    redirect: "follow",
  };

  const getSingleGroupData = async () => {
    const response = await fetchData(singleGroupURL, singleGroupRequestOptions);
    console.log(response);
    setTasks(response.tasks);
    setDepartmentDetails(response.departmentDetail);
    response.tasks.forEach((task) => {
      task.isAssigned && setAssignedTasks((prevTask) => [...prevTask, task]);
      !task.isAssigned && setOrphanTasks((prevTask) => [...prevTask, task]);
    });
  };

  useEffect(() => {
    console.log(tasks);
    getSingleGroupData();
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
    <div className="container px-2" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3 mb-4">
        <div className="bold-xlarge">
          بخش {departmentDetails?.departmentName}
        </div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
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
        tasks.map((task, index) => {
          return <ClientAssignedCard key={index} order={task} />;
        })}
      {tabState === "orphanTasksTab" &&
        orphanTasks.map((task, index) => {
          return <ClientAssignedCard key={index} order={task} />;
        })}
      {tabState === "assignedTasksTab" &&
        assignedTasks.map((task, index) => {
          return <ClientAssignedCard key={index} order={task} />;
        })}
    </div>
  );
};

export default SingleGroup;
