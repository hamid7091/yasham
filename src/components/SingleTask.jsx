import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import fetchData from "../util-functions/fetchData";
import Overall from "./Overall";
import SingleTaskTimeline from "./SingleTaskTimeline";
import Comments from "./Comments";
import SingleTaskFooter from "./SingleTaskFooter";
import CommentsPopup from "./CommentsPopup";
import AssignPopup from "./AssignPopup";
import PopupBackground from "./PopupBackground";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const SingleTask = () => {
  const [userInfo, setUserInfo] = useState();
  const [taskInfo, setTaskInfo] = useState();

  const [isCommentPopupActive, setIsCommentPopupActive] = useState(false);
  const [isAssignPopupActive, setIsAssignPopupActive] = useState(false);

  const [commentsData, setCommentsData] = useState();
  const [tabState, setTabState] = useState("overall");

  const [employees, setEmployees] = useState();
  const [taskSteps, setTaskSteps] = useState();

  const [isTaskStarted, setIsTaskStarted] = useState(
    taskInfo?.footer.isTaskStarted
  );
  const [isAssignedToMe, setIsAssignedToMe] = useState(
    userInfo?.isAssignedToMe
  );

  const accessToken = window.localStorage.getItem("AccessToken");

  const navigate = useNavigate();
  const param = useParams();

  const singleTaskHeader = new Headers();
  const singleTaskFormdata = new FormData();
  const singleTaskURL = "https://samane.zbbo.net/api/v1/task/get_task";
  const getEmployeesURL = "https://samane.zbbo.net/api/v1/user/get_employees";
  const getStepsURL = "https://samane.zbbo.net/api/v1/task/get_steps";
  const updateTaskURL = "https://samane.zbbo.net/api/v1/task/update_task";

  singleTaskHeader.append("Authorization", `Bearer ${accessToken}`);
  singleTaskFormdata.append("taskID", param.id);
  const singleTaskOptions = {
    method: "POST",
    headers: singleTaskHeader,
    body: singleTaskFormdata,
    redirect: "follow",
  };
  async function fetchSingleTaskData(url, options) {
    const response = await fetchData(url, options);
    if (response.message) {
      Loading.remove();
      navigate("/");
    } else {
      setUserInfo(response.userInfo);
      setTaskInfo(response.taskInfo);
      setIsTaskStarted(response.taskInfo.footer.isTaskStarted);
      setIsAssignedToMe(response.userInfo.isAssignedToMe);
      setCommentsData(response.taskInfo.comments);
      console.log(response);
      Loading.remove();
    }
  }
  async function fetchEmployees(url, options) {
    const response = await fetchData(url, options);
    if (response) {
      setEmployees(response);
    }
  }
  async function fetchSteps(url, options) {
    const response = await fetchData(url, options);
    if (response) {
      setTaskSteps(response);
    }
  }
  const handleStartTask = async () => {
    Loading.standard("در حال ارسال درخواست");
    const response = await fetchData(updateTaskURL, singleTaskOptions);
    if (response.started) {
      Loading.remove();
      Notify.success("تسک شروع شد");
      setIsTaskStarted(true);
    }
  };

  useEffect(() => {
    fetchSingleTaskData(singleTaskURL, singleTaskOptions);
    fetchEmployees(getEmployeesURL, singleTaskOptions);
    fetchSteps(getStepsURL, singleTaskOptions);
  }, []);

  const handleTabChange = (e) => {
    const clicked = e.target;
    const clickedA = e.target.nextElementSibling;
    const clickedB = e.target.previousElementSibling;
    clicked.classList.add("active-tab");
    if (clickedA && clickedB) {
      clickedA.classList.remove("active-tab");
      clickedB.classList.remove("active-tab");
      setTabState("stages");
    }
    if (clickedA === null) {
      clickedB.classList.remove("active-tab");
      clickedB.previousElementSibling.classList.remove("active-tab");
      setTabState("messages");
    }
    if (clickedB === null) {
      clickedA.classList.remove("active-tab");
      clickedA.nextElementSibling.classList.remove("active-tab");
      setTabState("overall");
    }
  };

  // ============================================================================
  const inventoryItems = [
    { itemID: 1, itemName: "گچ", itemUnitSI: "kg", itemUnit: "کیلوگرم" },
    { itemID: 2, itemName: "سیمان", itemUnitSI: "kg", itemUnit: "کیلوگرم" },
    { itemID: 3, itemName: "نخ", itemUnitSI: "cm", itemUnit: "سانتی متر" },
    { itemID: 4, itemName: "سیم", itemUnitSI: "m", itemUnit: "متر" },
    { itemID: 5, itemName: "طلا", itemUnitSI: "g", itemUnit: "گرم" },
    { itemID: 6, itemName: "اورانیوم", itemUnitSI: "mg", itemUnit: "میلی گرم" },
    { itemID: 7, itemName: "الکل", itemUnitSI: "ml", itemUnit: "میلی لیتر" },
  ];

  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  // ============================================================================

  return userInfo ? (
    <div className="container px-4" dir="rtl">
      {isCommentPopupActive && (
        <>
          <CommentsPopup
            taskID={param.id}
            setIsCommentPopupActive={setIsCommentPopupActive}
            setCommentsData={setCommentsData}
          />
          <PopupBackground
            isPopupActive={setIsCommentPopupActive}
            handleStartDateChange={() => {}}
            handleEndDateChange={() => {}}
            setStatusField={() => {}}
          />
        </>
      )}
      {isAssignPopupActive && (
        <>
          <AssignPopup
            taskID={param.id}
            employees={employees}
            taskSteps={taskSteps}
            setIsAssignPopupActive={setIsAssignPopupActive}
          />
          <PopupBackground
            isPopupActive={setIsAssignPopupActive}
            handleStartDateChange={() => {}}
            handleEndDateChange={() => {}}
            setStatusField={() => {}}
          />
        </>
      )}

      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
        <div className="bold-xlarge">{taskInfo.overAll.taskType}</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <div className="log-in-tabs bg-white d-flex justify-content-between align-items-center rounded-pill text-center p-2 mx-2 mt-2 drop-shadow">
        <span
          className="active-tab flex-fill py-2 px-1 has-pointer"
          onClick={(event) => handleTabChange(event)}
        >
          توضیحات
        </span>
        <span
          className="flex-fill py-2 px-1 has-pointer"
          onClick={(event) => handleTabChange(event)}
        >
          مراحل
        </span>
        <span
          className="flex-fill py-2 px-1 has-pointer"
          onClick={(event) => handleTabChange(event)}
        >
          پیام ها{" "}
        </span>
      </div>
      {tabState === "overall" && <Overall overAllData={taskInfo.overAll} />}
      {tabState === "stages" && (
        <SingleTaskTimeline
          timelineData={taskInfo.timeLine}
          assignedUser={userInfo.AssignedUser}
          userRole={userInfo.Role}
        />
      )}
      {tabState === "messages" && <Comments commentsData={commentsData} />}

      <SingleTaskFooter
        userInfo={userInfo}
        taskID={param.id}
        isTaskStarted={isTaskStarted}
        isAssignedToMe={isAssignedToMe}
        setIsCommentPopupActive={setIsCommentPopupActive}
        setIsAssignPopupActive={setIsAssignPopupActive}
        handleStartTask={handleStartTask}
      />
    </div>
  ) : (
    Loading.standard("در حال دریافت اطلاعات")
  );
};

export default SingleTask;
