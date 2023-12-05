import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/svg-icons/SearchIcon";
import SortIcon from "../assets/svg-icons/SortIcon";
import Select from "react-select";
import BusinessCard from "./BusinessCard";
import SingleHeader from "./SingleHeader";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import Message from "../micro-components/Message";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";

const AllBusinesses = () => {
  const navigate = useNavigate();

  const searchField = useRef(null);
  const [searchedBusinessName, setSearchedBusinessName] = useState();
  const [isSubmited, setIsSubmited] = useState(false);
  const [sortStatus, setSortStatus] = useState();
  const [businessData, setBusinessData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState();
  const [filteredCats, setFilteredCats] = useState([]);

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

  const mockResponse = {
    data: {
      response: {
        cards: [
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک حسن",
            businessID: "1",
            orderCount: 25,
            income: 25000000,
            profit: 15000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک حسین",
            businessID: "2",
            orderCount: 20,
            income: 20000000,
            profit: 10000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک محمود",
            businessID: "3",
            orderCount: 18,
            income: 19000000,
            profit: 10000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک رضا",
            businessID: "4",
            orderCount: 15,
            income: 14000000,
            profit: 10000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک حسن",
            businessID: "1",
            orderCount: 25,
            income: 25000000,
            profit: 15000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک حسین",
            businessID: "2",
            orderCount: 20,
            income: 20000000,
            profit: 10000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک محمود",
            businessID: "3",
            orderCount: 18,
            income: 19000000,
            profit: 10000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک رضا",
            businessID: "4",
            orderCount: 15,
            income: 14000000,
            profit: 10000000,
          },
        ],
      },
    },
  };
  const mockSearchedB = {
    data: {
      response: {
        cards: [
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک رضا",
            businessID: "1",
            orderCount: 25,
            income: 25000000,
            profit: 15000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک داوود",
            businessID: "2",
            orderCount: 20,
            income: 20000000,
            profit: 10000000,
          },
        ],
      },
    },
  };
  const mockSortedB = {
    data: {
      response: {
        cards: [
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک رضا",
            businessID: "1",
            orderCount: 25,
            income: 25000000,
            profit: 15000000,
          },
          {
            businessAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
            businessName: "کلینیک داوود",
            businessID: "2",
            orderCount: 20,
            income: 20000000,
            profit: 10000000,
          },
        ],
      },
    },
  };

  const sortOptions = [
    { label: "تعداد", value: 1 },
    { label: "درآمد", value: 2 },
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

  const setSortingStstus = (e) => {
    console.log(e, "fired");
    setSortStatus(e);
    setIsSubmited(true);
  };
  const handleSearchedBusinesstName = (event) => {
    setSearchedBusinessName(event.target.value);
  };
  const handleCapReduction = (cat) => {
    if (cat.value == "businessName") {
      setSearchedBusinessName(null);
      setIsSubmited(true);
    }
  };

  const getSearchedBusinessList = async (event) => {
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsSubmited(false);
    setFilteredCats([]);
    setSortStatus(null);
    const formdata = new FormData();
    if (searchedBusinessName) {
      console.log(searchedBusinessName);
      formdata.append("businessName", searchedBusinessName);
      setFilteredCats((prevStates) => [
        ...prevStates,
        {
          label: searchedBusinessName,
          value: "businessName",
        },
      ]);
    }

    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/client/client-list",
        formdata
      );
      // const response = mockSearchedB;
      setBusinessData(response.data.response.cards);
      searchField.current.value = null;

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      // const response = {
      //   data: {
      //     response: {
      //       userInfo: {
      //         mobile: "9360390099",
      //         userAvatar:
      //           "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //         userCaps: {
      //           اطلاعیه: true,
      //           پروفایل: true,
      //           "لیست سفارشات": true,
      //           "کسب و کارها": true,
      //         },
      //         userFirstName: "حمید",
      //         userID: 123,
      //         userLastName: "مدیر مالی",
      //         userRole: ["financial_manager"],
      //       },
      //     },
      //   },
      // };
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  const getBusinessList = async () => {
    setFilteredCats([]);
    setIsSubmited(false);
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/client/client-list");
      // const response = mockResponse;
      setBusinessData(response.data.response.cards);
      console.log(response.data.response);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  const getSortedBusinessList = async () => {
    setFilteredCats([]);
    setSearchedBusinessName(null);
    setIsSubmited(false);
    console.log(sortStatus);
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/client/client-list", {
        sortBy: sortStatus.value,
      });
      // const response = mockSortedB;
      console.log(response.data.response);
      setBusinessData(response.data.response.cards);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  useEffect(() => {
    getUser();
    getBusinessList();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      !isFManager && navigate("/unauthorized");
    }
  }, [isFManager]);
  useEffect(() => {
    console.log(sortStatus);
    if (isSubmited) {
      sortStatus ? getSortedBusinessList() : getBusinessList();
    }
  }, [isSubmited]);

  // console.log(businessData);
  return (
    <div className="container px-3 mt-100" dir="rtl">
      <SingleHeader title={"لیست کسب و کارها"} location={"/"} />
      <section className="d-flex align-items-center gap-3 mb-3">
        <input
          ref={searchField}
          onChange={handleSearchedBusinesstName}
          type="text"
          className="flex-grow-1 rounded-pill p-3"
          placeholder="جستجوی نام کسب و کار ..."
        />
        <span className="has-pointer" onClick={getSearchedBusinessList}>
          <SearchIcon />
        </span>
      </section>
      {filteredCats.length > 0 && (
        <>
          <div className="d-flex ">
            {filteredCats.map((cat, i) => {
              console.log(cat);
              return (
                <div
                  key={i}
                  className="bg-white py-1 px-3 mt-3 rounded-pill has-pointer ms-1"
                >
                  <span className="thin-default">{cat.label}</span>
                  <span onClick={() => handleCapReduction(cat)}>
                    <BLCloseBtn />
                  </span>
                </div>
              );
            })}
          </div>
          <hr className="text-primary" />
        </>
      )}
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
              onChange={(e) => setSortingStstus(e)}
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
      {businessData ? (
        businessData.map((data, index) => {
          return <BusinessCard data={data} key={index} />;
        })
      ) : (
        <Message>کسب و کاری برای نمایش وجود ندارد</Message>
      )}
    </div>
  );
};

export default AllBusinesses;
