import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";

function LoginChecker({ children }) {
  const [isLogedIn, setIsLogedIn] = useState(true);
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");
  Loading.standard("در حال بارگذاری");

  useEffect(() => {
    if (accessToken) {
      Loading.remove();
      setIsLogedIn(true);
      navigate("/");
    } else {
      setIsLogedIn(false);
      Loading.remove();
    }
  }, []);

  return isLogedIn ? Loading.standard("در حال بارگذاری") : children;
}
export default LoginChecker;
