import { useEffect, useState } from "react";

const useRoleSetter = (userRole) => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [isInventory, setIsInventory] = useState(false);
  const [isPManager, setIsPManager] = useState(false);
  const [isFManager, setIsFManager] = useState(false);
  const [isReception, setIsReception] = useState(false);
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
        role === "employee" && setIsEmployee(true);
        role === "shipping" && setIsShipping(true);
        role === "client" && setIsClient(true);
        role === "supper_administrator" && setIsSupervisor(true);
        role === "administrator" && setIsSupervisor(true);
        role === "inventory_manager" && setIsInventory(true);
        role === "project_manager" && setIsPManager(true);
        role === "financial_manager" && setIsFManager(true);
        role === "reception" && setIsReception(true);
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
