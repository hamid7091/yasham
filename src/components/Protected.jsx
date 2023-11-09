import { useState, useEffect } from "react";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");

  useEffect(() => {
    async function fetchAsyncData() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      const checkURL = "https://samane.zbbo.net/api/v1/user/check_access_token";
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      const userInfoData = await fetchData(checkURL, requestOptions);

      if (userInfoData?.userInfo?.userID) {
        setIsLoading(false);
        Loading.remove();
      } else {
        setIsLoading(true);
        Loading.remove();
        navigate("/login");
      }
    }
    fetchAsyncData();
  }, []);

  return isLoading ? Loading.standard("در حال دریافت اطلاعات") : children;
}

export default Protected;
