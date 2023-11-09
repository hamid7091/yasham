import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import SortIcon from "../assets/svg-icons/SortIcon";
import Select from "react-select";
import EmployeeCard from "./EmployeeCard";

const AllEmployees = () => {
  const location = useLocation();
  console.log(location.state);
  const [sortStatus, setSortStatus] = useState();

  const setSortStstus = (e) => {
    console.log(e);
    // فانکشن سورت در اینجا قرارداده خواهد شد
  };
  const sortOptions = [
    { label: "انجام شده‌ها", value: 0 },
    { label: "واگذاری شده‌ها", value: 1 },
  ];
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#2f66db" : "#79a3fe",
      backgroundColor: state.isSelected ? "#b8cfff" : "#fff)",
      padding: "8px",
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "#dee7fa",
        color: "var(--blue-royal)",
      },
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      borderRadius: "10rem",
      paddingInline: "8px",
      paddingBlock: "4px",
      ":hover": {
        border: "2px solid var( --blue-royal)",
      },
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
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
      borderRadius: "8px",
      border: "2px solid var( --blue-royal)",
    }),
    input: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
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
  const allEmployeesCards = [
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
  ];
  return (
    <div className="container px-3" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2">
        <div className="bold-xlarge">کلیه کارمندان</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <section className="mt-3">
        <div className="d-flex align-items-center justify-content-between bg-white p-3 rounded-5">
          <span>
            <span>
              <SortIcon />
            </span>
            <span className="bold-default me-1">مرتب‌سازی:</span>
          </span>
          <span>
            <Select
              id="sort-status"
              name="sort-status"
              value={sortStatus}
              onChange={(e) => setSortStstus(e)}
              options={sortOptions}
              placeholder="بر اساس"
              styles={customStyles}
              isClearable
              // isMulti
              // hideSelectedOptions={false}
            />
          </span>
        </div>
      </section>
      <section className="mt-2">
        <div>
          {allEmployeesCards.map((employee, index) => {
            return <EmployeeCard employee={employee} key={index} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default AllEmployees;
