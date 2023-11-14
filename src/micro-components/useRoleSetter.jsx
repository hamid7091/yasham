import { useEffect, useState } from "react";

const useRoleSetter = (userRole) => {
  const [isEmployee, setIsEmployee] = useState();
  const [isClient, setIsClient] = useState();
  const [isSupervisor, setIsSupervisor] = useState();
  const [isShipping, setIsShipping] = useState();
  const [isInventory, setIsInventory] = useState();
  const [isPManager, setIsPManager] = useState();
  const [isFManager, setIsFManager] = useState();
  const [isReception, setIsReception] = useState();
  useEffect(() => {
    userRole?.length === 1 &&
      userRole?.forEach((role) => {
        console.log(role);
        if (
          !isEmployee &&
          !isShipping &&
          !isClient &&
          !isSupervisor &&
          !isInventory &&
          !isPManager &&
          !isFManager &&
          !isReception
        ) {
          role === "employee"
            ? setIsEmployee(true)
            : isEmployee
            ? setIsEmployee(true)
            : setIsEmployee(false);
          role === "shipping" ? setIsShipping(true) : setIsShipping(false);
          role === "client" ? setIsClient(true) : setIsClient(false);
          role === "supper_administrator" ||
          role === "administrator" ||
          role === "supervisor"
            ? setIsSupervisor(true)
            : setIsSupervisor(false);
          role === "inventory_manager"
            ? setIsInventory(true)
            : setIsInventory(false);
          role === "project_manager"
            ? setIsPManager(true)
            : setIsPManager(false);
          role === "financial_manager"
            ? setIsFManager(true)
            : setIsFManager(false);
          role === "reception" ? setIsReception(true) : setIsReception(false);
        }
      });

    if (userRole?.length > 1) {
      userRole?.includes("employee")
        ? setIsEmployee(true)
        : setIsEmployee(false);
      userRole?.includes("client") ? setIsClient(true) : setIsClient(false);
      userRole?.includes("shipping")
        ? setIsShipping(true)
        : setIsShipping(false);
      userRole?.includes("supper_administrator") ||
      userRole?.includes("administrator") ||
      userRole?.includes("supervisor")
        ? setIsSupervisor(true)
        : setIsSupervisor(false);
      userRole?.includes("inventory_manager")
        ? setIsInventory(true)
        : setIsInventory(false);
      userRole?.includes("project_manager")
        ? setIsPManager(true)
        : setIsPManager(false);
      userRole?.includes("financial_manager")
        ? setIsFManager(true)
        : setIsFManager(false);
      userRole?.includes("reception")
        ? setIsReception(true)
        : setIsReception(false);
    }
  }, [userRole]);

  return [
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  ];
};

export default useRoleSetter;
