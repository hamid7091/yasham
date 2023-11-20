import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import SortIcon from "../assets/svg-icons/SortIcon";
import Select from "react-select";
import EmployeeCard from "./EmployeeCard";
import useRoleSetter from "../micro-components/useRoleSetter";
import axiosInstance from "../util-functions/axiosInstance";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import Message from "../micro-components/Message";
import usePredefinedDats from "../micro-components/usePredefinedDates";
import SingleHeader from "./SingleHeader";

const AllEmployees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [sortStatus, setSortStatus] = useState();
  const [employees, setEmployees] = useState();
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState();
  const {
    ts,
    tsu,
    te,
    teu,
    ys,
    ysu,
    ye,
    yeu,
    tms,
    tmsu,
    pms,
    pmsu,
    pme,
    pmeu,
    tws,
    twsu,
    pws,
    pwsu,
    pwe,
    pweu,
    tys,
    tysu,
    pys,
    pysu,
    pye,
    pyeu,
  } = usePredefinedDats();
  const [
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  ] = useRoleSetter(userRole);

  const setSortStstus = (e) => {
    setSortStatus(e);
    setIsSubmited(true);
  };
  const sortOptions = [
    { label: "انجام شده‌ها", value: 1 },
    { label: "واگذاری شده‌ها", value: 2 },
  ];
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
      border: "1px solid var(--gray-ultra-light)",
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
  const getEmployeesList = async () => {
    setIsSubmited(false);
    try {
      Loading.standard("در حال دریافت اطلاعات");
      console.log(tmsu, teu);
      const response = await axiosInstance.post("activity/employee-list", {
        startDate: tmsu,
        endDate: teu,
      });
      // const response = {
      //   data: {
      //     response: {
      //       cards: [
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //         {
      //           employeeAvatar:
      //             "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //           employeeName: "علی قناتیانی",
      //           employeeID: 6969,
      //           doneTasks: 12,
      //           assignedTasks: 14,
      //         },
      //       ],
      //     },
      //   },
      // };
      setEmployees(response.data.response?.cards);
      console.log(response.data.response);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getSortedEmployee = async () => {
    setIsSubmited(false);
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("activity/employee-list", {
        sortID: sortStatus.value,
        startDate: tmsu,
        endDate: teu,
      });
      setEmployees(response.data.response.cards);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      tmsu && getEmployeesList();
    }
  }, [tmsu]);
  useEffect(() => {
    if (!isLoading) {
      !isPManager && navigate("/unauthorized");
    }
  }, [isPManager]);
  useEffect(() => {
    if (isSubmited) {
      sortStatus ? getSortedEmployee() : getEmployeesList();
    }
  }, [isSubmited]);
  console.log(isSubmited);
  return (
    <div className="container px-3" dir="rtl">
      <SingleHeader title={"کلیه کارمندان"} location={location.state} />
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
            />
          </span>
        </div>
      </section>
      <section className="mt-2">
        <div>
          {employees ? (
            employees.map((employee, index) => {
              return <EmployeeCard employee={employee} key={index} />;
            })
          ) : (
            <Message>کارمندی ثبت نشده است</Message>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllEmployees;
