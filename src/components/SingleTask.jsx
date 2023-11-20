import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import Overall from "./Overall";
import SingleTaskTimeline from "./SingleTaskTimeline";
import Comments from "./Comments";
import SingleTaskFooter from "./SingleTaskFooter";
import CommentsPopup from "./CommentsPopup";
import AssignPopup from "./AssignPopup";
import EndTaskPopup from "./EndTaskPopup";
import PopupBackground from "./PopupBackground";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import SingleHeader from "./SingleHeader";

const SingleTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState();
  const [taskInfo, setTaskInfo] = useState();

  const [
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  ] = useRoleSetter(userInfo?.Role);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      (isShipping || isInventory) && navigate("/unauthorized");
    }
  }, [isShipping, isInventory]);

  const [isCommentPopupActive, setIsCommentPopupActive] = useState(false);
  const [isAssignPopupActive, setIsAssignPopupActive] = useState(false);
  const [isEndTaskPopupActive, setIsEndTaskPoupActive] = useState(false);

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
  const param = useParams();

  const getSingleTaskData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/task/get_task", {
        taskID: param.id,
      });
      setUserInfo(response.data.response.userInfo);
      setTaskInfo(response.data.response.taskInfo);
      setIsTaskStarted(response.data.response.taskInfo.footer.isTaskStarted);
      setIsAssignedToMe(response.data.response.userInfo.isAssignedToMe);
      setCommentsData(response.data.response.taskInfo.comments);
      setIsLoading(false);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getEmployees = async () => {
    try {
      const response = await axiosInstance.post(
        "/user/get_employees",
        {
          taskID: param.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEmployees(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  const getSteps = async () => {
    try {
      const response = await axiosInstance.post(
        "/task/get_steps",
        {
          taskID: param.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTaskSteps(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateTask = async () => {
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post("/task/update_task", {
        taskID: param.id,
      });
      Loading.remove();
      if (response.data.response.started) {
        Notify.success("تسک با موفقیت شروع شد");
        setIsTaskStarted(true);
        window.location.reload();
      }
      if (response.data.response.finished) {
        Notify.success("تسک با موفقیت به اتمام رسید");
        setIsTaskStarted(true);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getSingleTaskData();
      getEmployees();
      getSteps();
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
      {isEndTaskPopupActive && (
        <>
          <EndTaskPopup
            setIsEndTaskPopupActive={setIsEndTaskPoupActive}
            handleEndTask={handleUpdateTask}
          />
          <PopupBackground
            isPopupActive={setIsEndTaskPoupActive}
            handleStartDateChange={() => {}}
            handleEndDateChange={() => {}}
            setStatusField={() => {}}
          />
        </>
      )}
      <SingleHeader
        title={taskInfo.overAll.taskType}
        location={location.state}
      />
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
        setIsEndTaskPoupActive={setIsEndTaskPoupActive}
        handleStartTask={handleUpdateTask}
      />
    </div>
  ) : (
    Loading.standard("در حال دریافت اطلاعات")
  );
};

export default SingleTask;
