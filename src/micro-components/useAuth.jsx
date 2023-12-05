import { useEffect, useState } from "react";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "./useRoleSetter";

const useAuth = (accessList) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorItself, setErrorItself] = useState();
  const [response, setResponse] = useState();
  const [userRole, setUserRole] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [isReady, setIsReady] = useState(false);

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

  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      const nResponse = response.data.response;
      const roles = nResponse.userInfo.userRole;
      setIsLoading(false);
      setResponse(nResponse);
      setUserRole(roles);
      setHasAccess((prevState) => {
        for (const role of roles) {
          if (accessList.includes(role)) {
            return true;
          }
        }
        return prevState;
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
      setErrorItself(error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        await getUser();
        setIsReady(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchdata();
  }, []);

  console.log(isLoading, isError, errorItself, response, userRole, hasAccess);

  return {
    isLoading,
    isError,
    errorItself,
    response,
    userRole,
    hasAccess,
    isReady,
    setIsLoading,
    setErrorItself,
    setIsError,
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  };
};

export default useAuth;

// =====================================================================

// import { useEffect, useState, useCallback, useMemo } from "react";
// import axiosInstance from "../util-functions/axiosInstance";
// import useRoleSetter from "./useRoleSetter";

// const useAuth = (accessList) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [errorItself, setErrorItself] = useState();
//   const [response, setResponse] = useState();
//   const [userRole, setUserRole] = useState();
//   const [hasAccess, setHasAccess] = useState(false);

//   const [
//     isEmployee,
//     isClient,
//     isSupervisor,
//     isShipping,
//     isInventory,
//     isPManager,
//     isFManager,
//     isReception,
//   ] = useRoleSetter(userRole);

//   const getUser = useCallback(async () => {
//     try {
//       const response = await axiosInstance.post("/user/check_access_token");
//       const nResponse = response.data.response;
//       const roles = nResponse.userInfo.userRole;
//       setIsLoading(false);
//       setResponse(nResponse);
//       setUserRole(roles);
//       setHasAccess((prevState) => {
//         for (const role of roles) {
//           if (accessList.includes(role)) {
//             return true;
//           }
//         }
//         return prevState;
//       });
//     } catch (error) {
//       console.error(error);
//       setIsLoading(false);
//       setIsError(true);
//       setErrorItself(error);
//     }
//   }, []);

//   useEffect(() => {
//     getUser();
//   }, []);

//   const memoizedUseAuth = useMemo(() => {
//     return {
//       isLoading,
//       isError,
//       errorItself,
//       response,
//       userRole,
//       hasAccess,
//       setIsLoading,
//       setErrorItself,
//       setIsError,
//       isEmployee,
//       isClient,
//       isSupervisor,
//       isShipping,
//       isInventory,
//       isPManager,
//       isFManager,
//       isReception,
//     };
//   }, [
//     isLoading,
//     isError,
//     errorItself,
//     response,
//     userRole,
//     hasAccess,
//     setIsLoading,
//     setErrorItself,
//     setIsError,
//     isEmployee,
//     isClient,
//     isSupervisor,
//     isShipping,
//     isInventory,
//     isPManager,
//     isFManager,
//     isReception,
//   ]);

//   console.log(isLoading, isError, errorItself, response, userRole, hasAccess);

//   return memoizedUseAuth;
// };

// export default useAuth;

// =====================================================================

// import { useEffect, useState, useMemo } from "react";
// import axiosInstance from "../util-functions/axiosInstance";
// import useRoleSetter from "./useRoleSetter";

// const useAuth = (accessList) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [errorItself, setErrorItself] = useState();
//   const [response, setResponse] = useState();
//   const [userRole, setUserRole] = useState();
//   const [hasAccess, setHasAccess] = useState(false);

//   const memoizedHasAccess = useMemo(() => {
//     const getUser = async () => {
//       try {
//         const responsee = await axiosInstance.post("/user/check_access_token");
//         setIsLoading(false);
//         setResponse(responsee.data.response);
//         setUserRole(responsee.data.response.userInfo.userRole);

//         let hasAccess = false;
//         for (const role of accessList) {
//           if (responsee.data.response.userInfo.userRole.includes(role)) {
//             hasAccess = true;
//             break;
//           }
//         }

//         return hasAccess;
//       } catch (error) {
//         console.error(error);
//         setIsLoading();
//         setIsError(true);
//         setErrorItself(error);

//       }
//     };

//     return getUser;
//   }, []);

//   const [
//     isEmployee,
//     isClient,
//     isSupervisor,
//     isShipping,
//     isInventory,
//     isPManager,
//     isFManager,
//     isReception,
//   ] = useRoleSetter(userRole);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axiosInstance.post("/user/check_access_token");
//         setIsLoading(false);
//         setResponse(response.data.response);
//         setUserRole(response.data.response.userInfo.userRole);

//         const hasAccess = memoizedHasAccess();
//         setHasAccess(hasAccess);
//       } catch (error) {
//         console.error(error);
//         setIsLoading();
//         setIsError(true);
//         setErrorItself(error);
//       }
//     };

//     getUser();
//   }, [memoizedHasAccess]);

//   console.log(isLoading, isError, errorItself, response, userRole, hasAccess);

//   return {
//     isLoading,
//     isError,
//     errorItself,
//     response,
//     userRole,
//     hasAccess,
//     setIsLoading,
//     setErrorItself,
//     setIsError,
//     isEmployee,
//     isClient,
//     isSupervisor,
//     isShipping,
//     isInventory,
//     isPManager,
//     isFManager,
//     isReception,
//   };
// };

// export default useAuth;

// =====================================================

// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../util-functions/axiosInstance";
// import useRoleSetter from "./useRoleSetter";

// const useAuth = (accessList) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [errorItself, setErrorItself] = useState();
//   const [response, setResponse] = useState();
//   const [userRole, setUserRole] = useState();
//   const [hasAccess, setHasAccess] = useState(false);

//   const memoizedHasAccess = useMemo(() => {
//     const getUser = async () => {
//       try {
//         const response = await axiosInstance.post("/user/check_access_token");
//         setIsLoading(false);
//         setResponse(response.data.response);
//         setUserRole(response.data.response.userInfo.userRole);

//         let hasAccess = false;
//         for (const role of accessList) {
//           if (response.data.response.userInfo.userRole.includes(role)) {
//             hasAccess = true;
//             break;
//           }
//         }

//         return hasAccess;
//       } catch (error) {
//         console.error(error);
//         setIsLoading();
//         setIsError(true);
//         setErrorItself(error);
//       }
//     };

//     // const hasAccess = memoizedHasAccess();
//     setHasAccess(hasAccess);
//     return getUser;
//   }, []);

//   const [
//     isEmployee,
//     isClient,
//     isSupervisor,
//     isShipping,
//     isInventory,
//     isPManager,
//     isFManager,
//     isReception,
//   ] = useRoleSetter(userRole);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axiosInstance.post("/user/check_access_token");
//         setIsLoading(false);
//         setResponse(response.data.response);
//         setUserRole(response.data.response.userInfo.userRole);

//         setHasAccess(memoizedHasAccess());
//       } catch (error) {
//         console.error(error);
//         setIsLoading();
//         setIsError(true);
//         setErrorItself(error);
//       }
//     };

//     getUser();
//   }, []);

//   console.log(
//     isClient,
//     isEmployee,
//     isPManager,
//     isInventory,
//     isFManager,
//     isShipping,
//     isSupervisor,
//     isReception
//   );

//   return {
//     isLoading,
//     isError,
//     errorItself,
//     response,
//     userRole,
//     hasAccess,
//     setIsLoading,
//     setErrorItself,
//     setIsError,
//     isClient,
//     isEmployee,
//     isPManager,
//     isInventory,
//     isFManager,
//     isShipping,
//     isSupervisor,
//     isReception,
//   };
// };

// export default useAuth;
