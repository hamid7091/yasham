import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LoginChecker from "./components/LoginChecker";
import Profile from "./components/Profile";
import SingleTask from "./components/SingleTask";
import OrderRegister from "./components/OrderRegister";
import OrderList from "./components/OrderList";
import Package from "./components/Package";
import Performance from "./components/Performance";
import SingleOrder from "./components/SingleOrder";
import BusinessPage from "./components/BusinessPage";
import Invoices from "./components/Invoices";
import SingleInvoice from "./components/SingleInvoice";
import Checkout from "./components/Checkout";
import CallBackPayment from "./components/CallBackPayment";
import InvoiceUpdate from "./components/InvoiceUpdate";
import SingleGroup from "./components/SingleGroup";
import MyTasks from "./components/MyTasks";
import SingleStock from "./components/SingleStock";
import AddNewStockItem from "./components/AddNewStockItem";
import EditStockInfo from "./components/EditStockInfo";
import ReturnItem from "./components/ReturnItem";
import InventoryHandling from "./components/InventoryHandling";
import TaskReport from "./components/TaskReport";
import PerformanceReport from "./components/PerformanceReport";
import AllEmployees from "./components/AllEmployees";
import AllBusinesses from "./components/AllBusinesses";
import SingleBusiness from "./components/SingleBusiness";
import SingleBusinessReceptionVersion from "./components/SingleBusinessReceptionVersion";
import AllDeliveryTasks from "./components/AllDeliveryTasks";
import AllBusinessesReceptionVersion from "./components/AllBusinessesReceptionVersion";
import AddBusiness from "./components/AddBusiness";
import EditBusiness from "./components/EditBusiness";
import UserList from "./components/UserList";
import SingleUser from "./components/SingleUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import EndTask from "./components/EndTask";
import Unauthorized from "./components/Unauthorized";
import AllTasksLoader from "./components/AllTasksLoader";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/:id" element={<SingleTask />} />
        <Route path="/order/:id" element={<SingleOrder />} />
        <Route path="/invoice/:id" element={<SingleInvoice />} />
        <Route path="/package/:id" element={<Package />} />
        <Route path="/group/:id" element={<SingleGroup />} />
        <Route path="/invoiceUpdate/:id" element={<InvoiceUpdate />} />
        <Route path="/stock/:id" element={<SingleStock />} />
        <Route path="/editStock/:id" element={<EditStockInfo />} />
        <Route path="/business/:id" element={<SingleBusiness />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route
          path="/businessReception/:id"
          element={<SingleBusinessReceptionVersion />}
        />
        <Route path="/editBusiness/:id" element={<EditBusiness />} />
        <Route path="/user/:id" element={<SingleUser />} />
        <Route path="/endTask/:id" element={<EndTask />} />
        <Route path="/invoice_result" element={<CallBackPayment />} />
        <Route
          path="/login"
          element={
            <LoginChecker>
              <Login />
            </LoginChecker>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/businessInfo" element={<BusinessPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/registerOrder" element={<OrderRegister />} />
        <Route path="/orderList" element={<OrderList />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myTasks" element={<MyTasks />} />
        <Route path="/addNewStockItem" element={<AddNewStockItem />} />
        <Route path="/returnItem" element={<ReturnItem />} />
        <Route path="/inventoryHandling" element={<InventoryHandling />} />
        <Route path="/taskReport" element={<TaskReport />} />
        <Route path="/performanceReport" element={<PerformanceReport />} />
        <Route path="/allEmployees" element={<AllEmployees />} />
        <Route path="/allBusinesses" element={<AllBusinesses />} />
        <Route path="/allDeliveryTasks" element={<AllDeliveryTasks />} />
        <Route path="/addBusiness" element={<AddBusiness />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route
          path="/allBusinessesReception"
          element={<AllBusinessesReceptionVersion />}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/allTaskLoader" element={<AllTasksLoader />} />
      </Routes>
    </>
  );
};

export default App;
