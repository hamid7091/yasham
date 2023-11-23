import { useState, useEffect } from "react";
import axiosInstance from "../util-functions/axiosInstance";
import moment from "moment-jalaali";

const useInfLoader = (query, pageNumber, isClient) => {
  const [od, setOD] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(true);
  const [fCats, setFCats] = useState([]);
  useEffect(() => {
    setIsLoadingg(true);
    console.log("fired");
    const formdata = new FormData();

    console.log(query);
    if (query.length > 0) {
      console.log(query);
      setFCats([]);
      query.map((q) => {
        console.log(Boolean(q.startDate));
        if (q.invoiceStatus || q.invoiceStatus === 0) {
          formdata.append("invoiceStatusID", q.invoiceStatus);
          setFCats((prevStates) => [
            ...prevStates,
            {
              label:
                q.invoiceStatus === 3
                  ? "پرداخت شده"
                  : q.invoiceStatus === 1
                  ? "درانتظار پرداخت"
                  : "در انتظار قیمت گذازی",
              value: "client",
            },
          ]);
        }
        if (q.startDate) {
          console.log(q.startDate, q.endDate);
          formdata.append(
            "startDate",
            typeof q.startDate === "object"
              ? q.startDate?.toUnix()
              : q.startDate
          );
          formdata.append(
            "endDate",
            typeof q.endDate === "object" ? q.endDate?.toUnix() : q.endDate
          );
          setFCats((prevStates) => [
            ...prevStates,
            {
              label:
                typeof q.startDate === "object"
                  ? `${moment
                      .unix(q.startDate?.toUnix())
                      .format("jYYYY/jM/jD")} تا ${moment
                      .unix(q.endDate?.toUnix())
                      .format("jYYYY/jM/jD")}`
                  : `${moment
                      .unix(q.startDate)
                      .format("jYYYY/jM/jD")} تا ${moment
                      .unix(q.endDate)
                      .format("jYYYY/jM/jD")}`,
              value: "date",
            },
          ]);
        }
        if (q.searchedPatientName) {
          formdata.append(
            `${isClient ? "patientName" : "clientName"}`,
            q.searchedPatientName
          );
          setFCats((prevStates) => [
            ...prevStates,
            {
              label: q.searchedPatientName,
              value: `${isClient ? "patientName" : "clientName"}`,
            },
          ]);
        }
      });
      console.log(Object.fromEntries(formdata));
    } else {
      setFCats([]);
    }
    formdata.append("pageNum", pageNumber);
    pageNumber === 1 && setOD([]);
    axiosInstance
      .post("/order/history", formdata)
      .then((res) => {
        console.log(res.data.response);
        console.log(pageNumber);
        res.data.response.cards
          ? setOD((prevod) => [...prevod, ...res.data.response.cards])
          : setOD([]);
        setHasMore(res.data.response.total_pages > pageNumber);
        setIsLoadingg(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [query, pageNumber]);

  return { od, hasMore, isLoadingg, fCats };
};

export default useInfLoader;
