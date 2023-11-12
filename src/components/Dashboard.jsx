import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../util-functions/fetchData";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import { Loading } from "notiflix";
import Message from "../micro-components/Message";
import ClientFooter from "./ClientFooter";
import PackageCard from "./PackageCard";
import ActionMenu from "./ActionMenu";
import OrderList from "./OrderList";
import EmployeeDashboard from "./EmployeeDashboard";
import AllTasksLoader from "./AllTasksLoader";
import SupervisorDashboard from "./SupervisorDashboard";
import ClientDashboard from "./ClientDashboard";
import InventoryDashboard from "./InventoryDashboard";
import InventoryFooter from "./InventoryFooter";
import AllInventory from "./AllInventory";
import MyTasks from "./MyTasks";
import ProjectManagerDashboard from "./ProjectManagerDashboard";
import FinancialManagerDashboard from "./FinancialManagerDashboard";
import FManagerDashboard from "./FManagerDashboard";
import SalesPage from "./SalesPage";
import ReceptionDashboard from "./ReceptionDashboard";

import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";

const Dashboard = () => {
  const mockInventoryDashboardData = {
    userInfo: {
      mobile: "9360390080",
      userAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      userCaps: {
        اطلاعیه: true,
        پروفایل: true,
        "آیتم جدید": true,
        مرجوعی: true,
        انبارگردانی: true,
      },
      userFirstName: "حمید",
      userID: 121,
      userLastName: "وفسکی",
      userRole: ["inventory_manager"],
    },
    dashboardData: {
      overallStockStatus: {
        sufficient: 852,
        inSufficient: 89,
      },
      inSufficientStocks: [
        {
          stockID: 1,
          stockName: "گچ سفید کاری",
          stockAmount: 5,
          stockUnit: "کیلوگرم",
          stockPicture:
            "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
          stockStatus: "0",
        },
        {
          stockID: 2,
          stockName: "گچ سیاه",
          stockAmount: 6,
          stockUnit: "کیلوگرم",
          stockPicture:
            "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
          stockStatus: "1",
        },
        {
          stockID: 3,
          stockName: "سیمان",
          stockAmount: 0,
          stockUnit: "کیلوگرم",
          stockPicture:
            "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
          stockStatus: "0",
        },
        {
          stockID: 9,
          stockName: "الکل",
          stockAmount: 7,
          stockUnit: "لیتر",
          stockPicture:
            "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
          stockStatus: "1",
        },
      ],
    },
    universalUnits: [
      { label: "کیلوگرم", value: 1 },
      { label: "لیتر", value: 2 },
      { label: "عدد", value: 3 },
    ],
  };
  const mockProjectManagerDashboardData = {
    data: {
      response: {
        userInfo: {
          mobile: "9360390090",
          userAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
          userCaps: {
            رضایتمندی: true,
            "گزارش وظایف": true,
            "گزارش کارکرد": true,
            اطلاعیه: true,
            پروفایل: true,
            "لیست سفارشات": true,
            "لیست کارمندان": true,
          },
          userFirstName: "حمید",
          userID: 122,
          userLastName: "مدیرپروژه",
          userRole: ["project_manager"],
        },
        dailyOrders: { ordersCount: 5 },
        dailyTaskReport: {
          pending: 5,
          ongoing: 6,
          done: 7,
        },
        employeeStatus: {
          busiestEmployee: { employeeName: "علی قنات منش", employeeID: 69 },
          mostHardworkingEmployee: {
            employeeName: "علی قنات پور",
            employeeID: 6969,
          },
        },
        customerSatisfaction: {
          rate: 3.8,
          voteCount: 650,
        },
      },
    },
  };
  const mockFinancialManagerDashboardData = {
    userInfo: {
      mobile: "9360390099",
      userAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      userCaps: {
        اطلاعیه: true,
        پروفایل: true,
        "لیست سفارشات": true,
        "کسب و کارها": true,
      },
      userFirstName: "حمید",
      userID: 123,
      userLastName: "مدیر مالی",
      userRole: ["financial_manager"],
    },
    dailyOrders: { ordersCount: 5, dailyIncome: 25000000 },
    thisWeekSale: {
      data: [
        {
          date: "08/07",
          sale: 120000,
        },
        {
          date: "08/08",
          sale: 180000,
        },
        {
          date: "08/09",
          sale: 100000,
        },
        {
          date: "08/10",
          sale: 150000,
        },
        {
          date: "08/11",
          sale: 190000,
        },
        {
          date: "08/12",
          sale: 170000,
        },
        {
          date: "08/13",
          sale: 20,
        },
      ],
    },
    businessFinancialStatus: {
      mostProfit: {
        businessID: 1,
        businessName: "کلینیک قناتی ها",
        value: 250000,
      },
      mostOrders: {
        businessID: 2,
        businessName: "کلینیک قنات پور ها",
        value: 23,
      },
      mostDebt: {
        businessID: 3,
        businessName: "کلینیک علی قناتی",
        value: 230000,
      },
    },
  };
  const mockReceptionData = {
    userInfo: {
      mobile: "9360390088",
      userAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      userCaps: {
        "لیست کاربران": true,
        "کسب و کارها": true,
        اطلاعیه: true,
        پروفایل: true,
        "وظایف پیک": true,
      },
      userFirstName: "حمید",
      userID: 123,
      userLastName: "منشی نژاد",
      userRole: ["reception"],
    },
    dashboardInfo: {
      dailyOrders: {
        count: 10,
      },
      recentOrders: [
        {
          date: "1401-9-5",
          invoiceID: "1",
          invoiceStatus: "3",
          orderID: 124,
          patientName: " ",
          price: 1560000,
        },
        {
          date: "1401-9-5",
          invoiceID: "1",
          invoiceStatus: "3",
          orderID: 124,
          patientName: " ",
          price: 1560000,
        },
      ],
      packages: {
        106: {
          clientDetails: {
            clientName: "دمو123",
            clientAddress: "ارومیه مسجد شیخ",
            clientPhone: "0441212121",
            clientAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
          },
          sent: [
            {
              taskID: 436,
              taskType: "Cro-Cobalt Partial",
            },
          ],
          receive: [
            {
              taskID: 440,
              taskType: "PMMA",
            },
          ],
        },
        110: {
          clientDetails: {
            clientName: "دمو123",
            clientAddress: "ارومیه مسجد شیخ",
            clientPhone: "0441212121",
            clientAvatar:
              "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
          },
          sent: [
            {
              taskID: 436,
              taskType: "Cro-Cobalt Partial",
            },
          ],
          receive: [
            {
              taskID: 440,
              taskType: "PMMA",
            },
          ],
        },
      },
    },
  };

  // Define the options for the pie chart
  const [location, setLocation] = useState("dashboard");
  const [userInfo, setUserInfo] = useState();
  const [activeTasks, setActiveTasks] = useState([]);
  const [assignedTasks, setAssingedTasks] = useState([]);
  const [userRole, setUserRole] = useState([]);
  const [services, setServices] = useState();
  const [ongoingOrders, setOngoingOrders] = useState();
  const [clients, setClients] = useState([]);
  const [packages, setPackages] = useState();
  const [packagesArray, setPackagesArray] = useState();

  const [businessInfo, setBusinessInfo] = useState();
  const [superVisorDashboardData, setSuperVisorDashboardData] = useState([]);
  const [inventoryDashboardData, setInventoryDashboardData] = useState([]);
  const [universalUnits, setUniversalUnits] = useState([]);
  // PM state --------------------------------------------------
  const [dailyOrders, setDailyOrders] = useState();
  const [dailyTaskReport, setDailyTaskReport] = useState();
  const [employeeStatus, setEmployeeStatus] = useState();
  const [customerSatisfaction, setCustomerSatisfaction] = useState();
  // FM states
  const [finacialDailyOrders, setFinancialDailyOrders] = useState();
  const [financialWeelyChartData, setFinancialWeeklyChartData] = useState();
  const [financialBusinessInfo, setFinancialBusinessInfo] = useState();
  // Reception States
  const [orders, setOrders] = useState();

  const navigate = useNavigate();

  // ---------------------------------------------------------
  // ---------------------------------------------------------

  const getDataWithAxios = async () => {
    try {
      const response = await axiosInstance.post("/task/dashboard");
      // const response = mockProjectManagerDashboardData;
      console.log(response.data.response);

      setUserInfo(response.data.response.userInfo); // اطلاعات کاربر مشترک تمامی رول ها
      setActiveTasks(response.data.response.activeTasks); //تسک های فعال مخصوص کارمند
      setAssingedTasks(response.data.response.assignedTasks); // تسکهای اساین شده کارمند و کلاینت
      setUserRole(response.data.response.userInfo?.userRole); // رول
      setOngoingOrders(response.data.response.cards); //تمامی سفارش ها مخصوص کلاینت
      setServices(response.data.response.service); // اطلاعات نوع خدمات (ثابت و متحرک)
      setPackages(response.data.response.packages);
      setClients(response.data.response.clients); // تمام کلاینت ها برای ثبت سفارش از طرف سوپروایزر
      setBusinessInfo(response.data.response.businessInfo); // در حالت کلاینت اطلاعات کسب و کار را ست میکند
      setSuperVisorDashboardData(response.data.response.cards);
      setInventoryDashboardData(response.data.response.dashboardData);
      setUniversalUnits(response.data.response.universalUnits);
      // PM sets
      setDailyOrders(response.data.response.dailyOrders);
      setDailyTaskReport(response.data.response.dailyTaskReport);
      setEmployeeStatus(response.data.response.employeeStatus);
      setCustomerSatisfaction(response.data.response.customerSatisfaction);
      // FM sets
      setFinancialDailyOrders(response.data.response.dailyOrders);
      setFinancialWeeklyChartData(response.data.response.thisWeekSale);
      setFinancialBusinessInfo(response.data.response.businessFinancialStatus);
      //Reception sets
      setOrders(response.data.response?.dashboardInfo?.recentOrders);
      // setPackages(response.data.response?.dashboardInfo?.packages);
      //setDailyOrders(response.data.response?.dashboardInfo?.dailyOrders);

      console.log(response.data.response);
      Loading.remove();
    } catch (e) {
      console.error(e);
      Loading.remove();
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken")) {
      getDataWithAxios();
    } else {
      navigate("/login");
    }
  }, []);

  const packageConvertor = (packagesArray) => {
    console.log("function Fired");
    const packageKeys = Object.keys(packagesArray);
    const packageValue = Object.values(packagesArray);
    const packageArray = [];
    packageKeys.forEach((key, index) => {
      packageArray.push({
        clientID: key,
        packages: packageValue[index],
      });
    });
    console.log(packageArray);
    return packageArray;
  };
  useEffect(() => {
    console.log("fired");
    if (
      (userRole[0] === "shipping" && packages) ||
      (userRole[0] === "reception" && packages)
    ) {
      console.log("conditions met");
      setPackagesArray(packageConvertor(packages));
    }
  }, [packages]);

  // ---------------------------------------------------------

  // ---------------------------------------------------------

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

  return userInfo ? (
    <div className="container" dir="rtl">
      <DashboardHeader user={userInfo} userRole={userRole} />

      {isSupervisor && isEmployee && (
        <div>
          {location === "dashboard" && (
            <SupervisorDashboard data={superVisorDashboardData} />
          )}
          {location === "totalTasks" && <AllTasksLoader isDirect={true} />}
          {location === "actionMenu" && (
            <>
              <ActionMenu
                userRole={userRole}
                userInfo={userInfo}
                serviceType={services}
                clientsList={clients}
              />
            </>
          )}
        </div>
      )}
      {isSupervisor && !isEmployee && (
        <div>
          {location === "dashboard" && (
            <SupervisorDashboard data={superVisorDashboardData} />
          )}
          {location === "totalTasks" && <AllTasksLoader isDirect={true} />}
          {location === "actionMenu" && (
            <>
              <ActionMenu
                userRole={userRole}
                userInfo={userInfo}
                serviceType={services}
                clientsList={clients}
              />
            </>
          )}
        </div>
      )}
      {isEmployee && !isSupervisor && (
        <div>
          {location === "dashboard" && (
            <MyTasks
              aactiveTasks={activeTasks}
              aassignedTasks={assignedTasks}
              isDash={isEmployee}
            />
          )}
          {location === "totalTasks" && <AllTasksLoader isDirect={true} />}
          {location === "actionMenu" && (
            <>
              <ActionMenu
                userRole={userRole}
                userInfo={userInfo}
                serviceType={services}
                clientsList={clients}
              />
            </>
          )}
        </div>
      )}
      {isClient && (
        <div>
          {location === "dashboard" && (
            <ClientDashboard
              assignedTasks={assignedTasks}
              ongoingOrders={ongoingOrders}
              isClient={isClient}
            />
          )}
          {location === "totalTasks" && <OrderList isDirect={true} />}
          {location === "actionMenu" && (
            <>
              <ActionMenu
                userRole={userRole}
                userInfo={userInfo}
                serviceType={services}
                businessInfo={businessInfo}
              />
            </>
          )}
        </div>
      )}
      {isShipping && (
        <div>
          {location === "dashboard" && packagesArray ? (
            <div className="mb-100 px-3">
              <p className="bold-xxlarge pe-4">مرسوله های ارسالی</p>
              {packagesArray.map((pkg, index) => {
                return (
                  <PackageCard
                    key={index}
                    packageData={pkg}
                    isFromShipping={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="px-3 mb-100">
              <Message>در حال حاظر وظیفه ای به شما واگذار نشده است</Message>
            </div>
          )}
          {location === "totalTasks" && packagesArray.length > 0 ? (
            <div className="shipping-cards-container">
              <p className="bold-xxlarge pe-4">مرسوله های ارسالی</p>
              {packagesArray.map((pkg, index) => {
                return <PackageCard key={index} packageData={pkg} />;
              })}
              {/* <div>
                <Pie data={data} options={options} />
              </div> */}
            </div>
          ) : (
            <div className="px-3 mb-100">
              <Message>در حال حاظر وظیفه ای به شما واگذار نشده است</Message>
            </div>
          )}
          {location === "actionMenu" && (
            <ActionMenu
              userRole={userRole}
              userInfo={userInfo}
              serviceType={services}
              businessInfo={businessInfo}
            />
          )}
        </div>
      )}
      {isInventory && (
        <div>
          {location === "dashboard" && (
            <InventoryDashboard
              dashboardData={inventoryDashboardData}
              setLocation={setLocation}
            />
          )}
          {location === "totalTasks" && <AllInventory />}
          {location === "actionMenu" && (
            <>
              <ActionMenu
                userRole={userRole}
                userInfo={userInfo}
                serviceType={services}
                businessInfo={businessInfo}
                universalUnits={universalUnits}
              />
            </>
          )}
        </div>
      )}
      {isPManager && (
        <div>
          {location === "dashboard" && (
            <ProjectManagerDashboard
              dailyOrders={dailyOrders}
              dailyTaskReport={dailyTaskReport}
              employeeStatus={employeeStatus}
              customerSatisfaction={customerSatisfaction}
            />
          )}
          {location === "totalTasks" && <AllTasksLoader isDirect={true} />}
          {location === "actionMenu" && (
            <ActionMenu
              userRole={userRole}
              userInfo={userInfo}
              serviceType={services}
              businessInfo={businessInfo}
              universalUnits={universalUnits}
            />
          )}
        </div>
      )}
      {isFManager && (
        <div>
          {location === "dashboard" && (
            <FinancialManagerDashboard
              dailyOrders={finacialDailyOrders}
              financialBusinessInfo={financialBusinessInfo}
              financialWeelyChartData={financialWeelyChartData}
            />
          )}
          {location === "totalTasks" && <SalesPage />}
          {location === "actionMenu" && (
            <ActionMenu
              userRole={userRole}
              userInfo={userInfo}
              serviceType={services}
              businessInfo={businessInfo}
              universalUnits={universalUnits}
            />
          )}
        </div>
      )}
      {isReception && (
        <div>
          {location === "dashboard" && (
            <ReceptionDashboard
              dailyOrders={dailyOrders}
              recentOrders={orders}
              packageData={packagesArray}
            />
          )}
          {location === "totalTasks" && <OrderList isDirect={true} />}
          {location === "actionMenu" && (
            <ActionMenu
              userRole={userRole}
              userInfo={userInfo}
              serviceType={services}
              businessInfo={businessInfo}
              universalUnits={universalUnits}
            />
          )}
        </div>
      )}

      {/* قسمت فوتر */}
      {isSupervisor && isEmployee && (
        <DashboardFooter setLocation={setLocation} serviceType={services} />
      )}
      {isSupervisor && !isEmployee && (
        <DashboardFooter setLocation={setLocation} serviceType={services} />
      )}
      {isEmployee && !isSupervisor && (
        <DashboardFooter setLocation={setLocation} serviceType={services} />
      )}
      {isClient && (
        <ClientFooter setLocation={setLocation} serviceType={services} />
      )}
      {isShipping && <DashboardFooter setLocation={setLocation} />}
      {isInventory && <InventoryFooter setLocation={setLocation} />}
      {isPManager && <DashboardFooter setLocation={setLocation} />}
      {isFManager && <FManagerDashboard setLocation={setLocation} />}
      {isReception && <ClientFooter setLocation={setLocation} />}
    </div>
  ) : (
    Loading.standard("در حال دریافت اطلاعات")
  );
};

export default Dashboard;
