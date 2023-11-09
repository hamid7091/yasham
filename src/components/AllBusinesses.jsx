import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import SearchIcon from "../assets/svg-icons/SearchIcon";
import SortIcon from "../assets/svg-icons/SortIcon";
import Select from "react-select";
import BusinessCard from "./BusinessCard";

const AllBusinesses = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const [searchedBusinessName, setSearchedBusinessName] = useState();
  const [sortStatus, setSortStatus] = useState();
  const [businessData, setBusinessData] = useState();
  const mockResponse = {
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
  };

  const sortOptions = [
    { label: "تعداد", value: 0 },
    { label: "درآمد", value: 1 },
    { label: "سود", value: 2 },
  ];
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#2f66db" : "#79a3fe",
      backgroundColor: state.isSelected ? "#b8cfff" : "#fff)",
      padding: "8px",
      fontWeight: "bold",
      ":not(:last-child)": {
        borderBottom: "2px solid var(--blue-royal)",
      },
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
      paddingInline: "4px",
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

  const handleSearchedBusiness = () => {};
  const getFilteredBusinessInfo = () => {};

  useEffect(() => {
    setBusinessData(mockResponse.cards);
  }, []);
  return (
    businessData && (
      <div className="container px-3" dir="rtl">
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
          <div className="bold-xlarge">لیست کسب و کارها</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
        <section className="d-flex align-items-center gap-3 mb-3">
          <input
            onChange={handleSearchedBusiness}
            value={searchedBusinessName}
            type="text"
            className="flex-grow-1 rounded-pill p-3"
            placeholder="جستجوی نام کسب و کار ..."
          />
          <span className="has-pointer" onClick={getFilteredBusinessInfo}>
            <SearchIcon />
          </span>
        </section>
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
                onChange={(e) => setSortStatus(e)}
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
        {businessData.map((data, index) => {
          return <BusinessCard data={data} key={index} />;
        })}
      </div>
    )
  );
};

export default AllBusinesses;
