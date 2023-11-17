import React, { useEffect, useRef, useState } from "react";
import BackArrow from "../assets/svg-icons/BackArrow";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Select from "react-select";
import PlusButton from "../assets/svg-icons/PlusButton";
import PopupBackground from "./PopupBackground";
import AddDetailPopup from "./AddDetailPopup";
import Message from "../micro-components/Message";
import MinusButton from "../assets/svg-icons/MinusButton";
import EditButton from "../assets/svg-icons/EditButton";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import Unauthorizaed from "../components/Unauthorized";

const OrderRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fixedRadio = useRef(null);
  const mobileRadio = useRef(null);
  const maleRadio = useRef(null);
  const femaleRadio = useRef(null);
  const [userRole, setUserRole] = useState();
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

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [description, setDescription] = useState();
  const [clientName, setClientName] = useState();
  const [clientID, setClientID] = useState();

  const [selectedDetail, setSelectedDetail] = useState(null);

  // Add Details Popup States

  const [isAddDetailPopupActive, setIsAddDetailPopupActive] = useState(false);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(isClient);
    console.log("ue1");
    if (!isLoading) {
      !isClient && !isSupervisor && navigate("/unauthorized");
    }
  }, [isClient, isSupervisor]);

  const fixedServices = location.state?.serviceType[1].serviceTaskTypes;
  const mobileServices = location.state?.serviceType[2].serviceTaskTypes;
  const clients = location.state?.clientsList;

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

  const clientOptions = [];
  clients?.forEach((client) => {
    clientOptions.push({
      value: client.clientID,
      label: client.clientName,
    });
  });
  const serviceListConvertor = (array) => {
    const result = [];
    array.forEach((arr) => {
      result.push({
        value: arr.taskTypeID,
        label: arr.taskTypeName,
      });
    });
    return result;
  };
  const handleFormSubmitAxios = async (event) => {
    event.preventDefault();
    let convertedDetails = [];
    for (let obj of details) {
      let newObj = {
        serviceType: obj.serviceType,
        taskType: obj.taskType.value,
      };
      let toothColors = [];
      let toothNumbers = [];
      for (let i = 0; i < obj.toothColors.length; i++) {
        // Push the value property of the first element of each subarray to the corresponding output array
        toothColors.push(obj.toothColors[i][0].value);
        // Create an empty array to store the values of each subarray in toothNumbers
        let temp = [];
        // Loop through each element in the subarray and push its value property to the temp array
        for (let j = 0; j < obj.toothNumbers[i].length; j++) {
          temp.push(obj.toothNumbers[i][j].value);
        }
        // Push the temp array to the toothNumbers output array
        toothNumbers.push(temp);
      }
      newObj.toothColors = toothColors;
      newObj.toothNumbers = toothNumbers;

      convertedDetails.push(newObj);
    }
    const formdata = new FormData();
    if (clientID) {
      formdata.append("clientID", `${clientID}`);
    }
    formdata.append("patient-last-name", lastname);
    formdata.append("patient-first-name", firstname);
    formdata.append("patient-age", age);
    formdata.append("order-description", description);
    formdata.append("patient-gender", gender);
    formdata.append("order-detail", JSON.stringify(convertedDetails));

    try {
      Loading.standard("در حال ثبت سفارش شما");
      const response = await axiosInstance.post("/order/register", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.response.success) {
        Loading.remove();
        Notify.success("سفارش با موفقیت ثبت شد");
        navigate("/");
      } else {
        Loading.remove();
        Notify.failure("خطا ! مجددا تلاش کنید");
      }
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const handleFirstnameSet = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastnameSet = (event) => {
    setLastname(event.target.value);
  };
  const handleAgeSet = (event) => {
    setAge(event.target.value);
  };
  const handleDescriptionSet = (event) => {
    setDescription(event.target.value);
  };
  const handleGenderSet = (event) => {
    if (event.currentTarget == maleRadio.current) {
      setGender(1);
    } else if (event.currentTarget == femaleRadio.current) {
      setGender(2);
    }
  };
  const handleAddDetails = () => {
    setIsAddDetailPopupActive(true);
    setSelectedDetail(null);
  };
  const handleEdit = (detail) => {
    setIsAddDetailPopupActive(true);
    setSelectedDetail(detail);
  };
  const handleDeleteDetail = (detail) => {
    console.log(detail);
    const newDetails = details.filter((f) => {
      return f.id !== detail.id;
    });
    setDetails(newDetails);
  };
  const handleUpdate = (detail) => {
    const index = details.findIndex((det) => {
      return det.id === detail.id;
    });
    if (index !== -1) {
      const newDetails = [...details];
      newDetails[index] = detail;
      setDetails(newDetails);
    } else {
      const id = Math.floor(Math.random() * 1000);
      const newDetail = { id: id, ...detail };

      setDetails([...details, newDetail]);
    }
  };
  const handleClientName = (value) => {
    console.log(value);
    setClientID(value?.value);
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
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  return (
    <div className="container bg-default" dir="rtl">
      {isAddDetailPopupActive && (
        <>
          <AddDetailPopup
            setIsAddDetailPopupActive={setIsAddDetailPopupActive}
            fixedRadio={fixedRadio}
            mobileRadio={mobileRadio}
            fixedOptions={serviceListConvertor(fixedServices)}
            mobileOptions={serviceListConvertor(mobileServices)}
            customStyles={customStyles}
            details={
              selectedDetail || {
                id: "",
                serviceType: "",
                taskType: "",
                toothColors: [[]],
                toothNumbers: [[]],
              }
            }
            handleUpdate={handleUpdate}
          />
          <PopupBackground
            isPopupActive={setIsAddDetailPopupActive}
            handleStartDateChange={() => {}}
            handleEndDateChange={() => {}}
            setStatusField={() => {}}
          />
        </>
      )}
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
        <div className="bold-xlarge">ثبت سفارش جدید</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <form
        className="edit-form form-group mt-3 p-3 tasks"
        onSubmit={handleFormSubmitAxios}
      >
        {isSupervisor && (
          <>
            <label htmlFor="clients-name" className="bold500-large my-3 pe-3">
              مشتری
            </label>
            <Select
              id="clients-name"
              name="cliens-name"
              value={clientName}
              onChange={(e) => handleClientName(e)}
              options={clientOptions}
              placeholder="نام پزشک را انتخاب کنید"
              styles={customStyles}
              isClearable
            />
          </>
        )}

        <label htmlFor="patient-firstname" className="bold500-large mb-3 pe-3">
          نام بیمار
        </label>
        <input
          required
          onChange={handleFirstnameSet}
          type="text"
          name="patient-firstname"
          className="form-control rounded-pill mb-3 py-2 border-0 px-3"
          id="patient-firstname"
          placeholder="نام بیمار وارد کنید"
        />
        <label htmlFor="patient-lastname" className="bold500-large mb-3 pe-3">
          نام خانوادگی بیمار
        </label>
        <input
          required
          onChange={handleLastnameSet}
          type="text"
          name="patient-lastname"
          className="form-control rounded-pill mb-3 py-2 border-0 px-3"
          id="patient-lastname"
          placeholder="نام خانوادگی بیمار را وارد کنید"
        />
        <label htmlFor="patient-age" className="bold500-large mb-3 pe-3">
          سن بیمار
        </label>
        <input
          required
          onChange={handleAgeSet}
          type="number"
          name="patient-age"
          className="form-control rounded-pill mb-3 py-2 border-0 px-3"
          id="patient-age"
          placeholder="سن بیمار را وارد کنید"
        />

        <label
          className="bold500-large my-3 pe-3 d-block"
          htmlFor="patient-sex"
        >
          جنسیت
        </label>
        <div className="d-flex gap-4 pe-3 mb-3">
          <div>
            <input
              ref={femaleRadio}
              onClick={handleGenderSet}
              type="radio"
              className="form-check-input ms-2"
              name="patient-sex"
              id="flexRadioDefault1"
            />
            <label
              htmlFor="flexRadioDefault1"
              className="form-check-label bold500-large me-1"
            >
              زن
            </label>
          </div>
          <div>
            <input
              ref={maleRadio}
              onChange={handleGenderSet}
              type="radio"
              className="form-check-input ms-2"
              name="patient-sex"
              id="flexRadioDefault2"
            />
            <label
              htmlFor="flexRadioDefault2"
              className="form-check-label bold500-large me-1"
            >
              مرد
            </label>
          </div>
        </div>
        <label htmlFor="extra-info" className="bold500-large my-3 pe-3">
          توضیحات
        </label>
        <textarea
          onChange={handleDescriptionSet}
          name="extra-info"
          id=""
          cols="6"
          rows="6"
          className="form-control rounded-5 border-0 py-3 px-4"
          placeholder="جزئیات ..."
        ></textarea>
        <hr />
        {details.length > 0 ? (
          details.map((detail, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-4 drop-shadow p-3 mt-3 "
              >
                <div className="d-flex align-items-center">
                  <span className="flex-grow-1 royal-xlarge-bold">
                    {detail.taskType.label}
                  </span>
                  <span
                    className="has-pointer"
                    onClick={() => handleDeleteDetail(detail)}
                  >
                    <MinusButton />
                  </span>
                  <span
                    className="has-pointer"
                    onClick={() => handleEdit(detail)}
                  >
                    <EditButton />
                  </span>
                </div>
                <div className="table-container mt-3">
                  <table>
                    <thead>
                      <tr>
                        <th>شماره دندان</th>
                        <th>رنگ دندان</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.toothColors.map((colorArray, i) => {
                        return (
                          <tr key={i} className="">
                            <td>
                              {detail.toothNumbers[i].map((numArray, i) => {
                                return <span key={i}>{numArray.label} </span>;
                              })}
                            </td>
                            <td>{colorArray[0]?.label}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        ) : (
          <Message>هیچ جزئیات سفارشی وجود ندارد</Message>
        )}
        <div
          className="bg-white rounded-pill py-2 px-2 d-inline-block border-royal-2 mt-3 has-pointer"
          onClick={handleAddDetails}
        >
          <PlusButton />
          <span className="bold-large">افزودن جزئیات جدید</span>
        </div>
        <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
          <button
            type="submit"
            className="btn-royal-bold rounded-pill flex-grow-1 py-3"
          >
            ثبت سفارش
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderRegister;
