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
    userRole?.forEach((role) => {
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
        role === "employee" ? setIsEmployee(true) : setIsEmployee(false);
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
        role === "project_manager" ? setIsPManager(true) : setIsPManager(false);
        role === "financial_manager"
          ? setIsFManager(true)
          : setIsFManager(false);
        role === "reception" ? setIsReception(true) : setIsReception(false);
      }
    });
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
