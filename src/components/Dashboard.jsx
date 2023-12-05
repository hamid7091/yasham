import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import ClientFooter from "./ClientFooter";
import ActionMenu from "./ActionMenu";
import OrderList from "./OrderList";
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
import ShippingDashboard from "./ShippingDashboard";
import ErrorPage from "./ErrorPage";

const Dashboard = () => {
  // Define the options for the pie chart
  const [location, setLocation] = useState("dashboard");
  const [userInfo, setUserInfo] = useState();
  const [activeTasks, setActiveTasks] = useState([]);
  const [assignedTasks, setAssingedTasks] = useState([]);
  const [userRole, setUserRole] = useState([]);
  const [services, setServices] = useState();
  const [ongoingOrders, setOngoingOrders] = useState();
  const [clients, setClients] = useState([]);
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
  const [errorItself, setErrorItself] = useState();
  const [isError, setIsError] = useState(false);
  // ---------------------------------------------------------

  const getDataWithAxios = async () => {
    try {
      const response = await axiosInstance.post("/task/dashboard");
      // const response = mockFinancialManagerDashboardData;
      console.log(response.data.response);

      setUserInfo(response.data.response.userInfo); // اطلاعات کاربر مشترک تمامی رول ها
      setActiveTasks(response.data.response.activeTasks); //تسک های فعال مخصوص کارمند
      setAssingedTasks(response.data.response.assignedTasks); // تسکهای اساین شده کارمند و کلاینت
      setUserRole(response.data.response.userInfo?.userRole); // رول
      setOngoingOrders(response.data.response.cards); //تمامی سفارش ها مخصوص کلاینت
      setServices(response.data.response.service); // اطلاعات نوع خدمات (ثابت و متحرک)

      // setPackages(response.data.response.packages);
      setPackagesArray(response.data.response.packages);

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
      setOrders(response.data.response?.recentOrders);
      setDailyOrders(response.data.response?.dailyOrders);

      Loading.remove();
    } catch (e) {
      console.error(e);
      setErrorItself(e);
      setIsError(true);
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

  return !isError ? (
    <div className="container" dir="rtl">
      {userInfo && (
        <>
          <DashboardHeader user={userInfo} />
          <div className="mt-100">
            {isSupervisor && isEmployee && (
              <div>
                {location === "dashboard" && (
                  <SupervisorDashboard data={superVisorDashboardData} />
                )}
                {location === "totalTasks" && (
                  <AllTasksLoader isDirect={true} />
                )}
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
                {location === "totalTasks" && (
                  <AllTasksLoader isDirect={true} />
                )}
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
                    activeTasks={activeTasks}
                    assignedTasks={assignedTasks}
                    isDash={true}
                  />
                )}
                {location === "totalTasks" && (
                  <AllTasksLoader isDirect={true} />
                )}
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
                    isFManager={isFManager}
                  />
                )}
                {location === "totalTasks" && <OrderList />}
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
                {location === "dashboard" && (
                  <ShippingDashboard packagesArray={packagesArray} />
                )}
                {location === "totalTasks" && (
                  <ShippingDashboard packagesArray={packagesArray} />
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
                {location === "totalTasks" && (
                  <AllTasksLoader isDirect={true} />
                )}
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
                {location === "totalTasks" && <OrderList />}
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
          </div>

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
        </>
      )}
    </div>
  ) : (
    <ErrorPage error={errorItself} />
  );
};

export default Dashboard;
