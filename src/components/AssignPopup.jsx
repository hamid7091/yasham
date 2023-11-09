import React, { useRef, useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import Select from "react-select";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix";
import { Notify } from "notiflix";

const AssignPopup = ({
  employees,
  setIsAssignPopupActive,
  taskSteps,
  taskID,
}) => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const [emplyeeID, setEmployeeID] = useState(null);
  const [stepID, setStepID] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const secondSelect = useRef(null);
  const stepsOptions = [];
  const employeeOptopns = [];

  taskSteps.forEach((step) => {
    stepsOptions.push({
      value: step.step_id,
      label: step.step_name,
    });
  });

  employees.forEach((employee) => {
    employeeOptopns.push({
      value: employee.user_id,
      label: employee.fullName,
    });
  });

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "var(--gray-dark)" : "var(--gray)",
      backgroundColor: state.isSelected ? "var(--gray-ultra-light)" : "#fff)",
      padding: "8px",
      fontWeight: "bold",
      ":not(:last-child)": {
        borderBottom: "2px solid var(--gray-ultra-light)",
      },
      ":hover": {
        backgroundColor: "var(--gray-very-light)",
        color: "#000",
      },
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      borderRadius: "10rem",
      paddingInline: "8px",
      paddingBlock: "4px",
      border: "none",
      ":hover": {
        border: "2px solid var( --blue-royal)",
      },
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-dark)",
      fontWeight: "bold",
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-very-light)",
      fontWeight: "bold",
      fontSize: "14px",
    }),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      ":hover": {
        color: "var(--blue-royal-light)",
      },
      backgroundColor: "var(--blue-royal-very-light)",
      padding: "3px",
      marginRight: "5px",
      borderRadius: "6px",
    }),
    clearIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      ":hover": {
        color: "var(--blue-royal-light)",
      },
    }),
    menuList: (defaultStyles) => ({
      ...defaultStyles,
      borderRadius: "4px",
    }),
    input: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-dark)",
      fontSize: "16px",
    }),
    multiValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      borderRadius: "10px",
      fontWeight: "bold",
      paddingRight: "10px",
    }),
    multiValueRemove: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "var(--blue-royal-light)",
      borderRadius: "50%",
      padding: "2px",
      margin: "5px",
    }),
  };
  const handleClosePopup = () => {
    setIsAssignPopupActive(false);
  };
  const handleRedirectLevel = () => {
    if (!isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };
  const handleAssignTask = async (event) => {
    const assignTaskURL = "https://samane.zbbo.net/api/v1/task/assign_Task?";
    const assignTaskHeader = new Headers();
    assignTaskHeader.append("Authorization", `Bearer ${accessToken}`);
    const assignTaskFormData = new FormData();
    event.preventDefault();
    Loading.standard("در حال ارسال درخواست");

    assignTaskFormData.append("taskID", taskID);
    assignTaskFormData.append("user_to_assign_list", emplyeeID?.value);
    if (!isChecked && emplyeeID) {
      const assignTaskReqOptions = {
        method: "POST",
        headers: assignTaskHeader,
        body: assignTaskFormData,
        redirect: "follow",
      };
      const response = await fetchData(assignTaskURL, assignTaskReqOptions);
      if (response.success) {
        Loading.remove();
        Notify.success("تسک با موفقیت اساین شد", {
          position: "center-top",
          borderRadius: "5rem",
          fontFamily: "Vazir FD",
          fontSize: "14px",
        });
        setIsAssignPopupActive(false);
      } else {
        Loading.remove();
        Notify.failure("خطا ! مشکلی پیش آمده");
        setIsAssignPopupActive(false);
      }
    } else if (isChecked && emplyeeID && stepID) {
      assignTaskFormData.append("redirect_level", "true");
      assignTaskFormData.append("level", `${stepID.value}`);
      const assignTaskReqOptions = {
        method: "POST",
        headers: assignTaskHeader,
        body: assignTaskFormData,
        redirect: "follow",
      };
      const response = await fetchData(assignTaskURL, assignTaskReqOptions);
      if (response.success) {
        Loading.remove();
        Notify.success("تسک با موفقیت اساین شد", {
          rtl: "true",
        });
        setIsAssignPopupActive(false);
      } else {
        Loading.remove();
        Notify.failure("خطا ! مشکلی پیش آمده");
        setIsAssignPopupActive(false);
      }
    } else {
      Loading.remove();
      Notify.failure("فیلد انتخاب کاربر خالی است", {
        position: "center-top",
        rtl: "true",
        borderRadius: "5rem",
        fontFamily: "Vazir FD",
        fontSize: "14px",
      });
    }
  };

  return (
    <div dir="rtl" className="end-task-popup bg-light rounded-5 p-4">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge mb-0">اساین تسک</p>
        <span className="has-pointer" onClick={handleClosePopup}>
          <CloseIcon />
        </span>
      </div>
      <div className="tborder-vlroyal mt-2 pt-3 px-3">
        <form
          onSubmit={handleAssignTask}
          className="edit-form form-group mt-3 px-3 pt-3"
        >
          <div className="mt-3">
            <label className="mb-2 me-3 bold500-large" htmlFor="employee-field">
              کاربر مورد نظر را انتخاب کنید :
            </label>
            <Select
              id="employee-field"
              name="employee-field"
              value={emplyeeID}
              onChange={setEmployeeID}
              options={employeeOptopns}
              placeholder="جستجوی کاربر"
              styles={customStyles}
              isClearable
            />
            <div className="d-flex align-items-center gap-1 me-3 my-3">
              <label
                htmlFor="level"
                className="ctn mb-2 bold500-large mt-2 has-pointer d-flex align-items-center"
              >
                <span>مرحله را تغییر میدهید ؟</span>
                <input
                  type="checkbox"
                  name="level"
                  id="level"
                  onClick={handleRedirectLevel}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <label
              className={isChecked ? "mb-2 me-3 bold500-large" : "d-none"}
              htmlFor="step-id"
            >
              جستجوی مرحله :
            </label>
            <Select
              id="step-id"
              name="step-id"
              ref={secondSelect}
              className={isChecked ? "" : "d-none"}
              value={stepID}
              onChange={setStepID}
              options={stepsOptions}
              placeholder="جستجوی مرحله"
              styles={customStyles}
              isClearable
            />
          </div>
          <button className="btn-royal-bold rounded-pill flex-grow-1 py-3 mt-5">
            اساین تسک
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignPopup;
