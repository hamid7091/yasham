import { useEffect, useState } from "react";
import moment from "moment-jalaali";

const useDate = (pDate) => {
  moment.loadPersian();
  const [ndate, setnDate] = useState(null);
  useEffect(() => {
    const preFormatedDate = pDate;
    const formatedDate = moment(preFormatedDate, "jYYYY-jM-jD");
    const year = formatedDate.format("jYYYY");
    const month = formatedDate.format("jMMMM");
    const day = formatedDate.format("jD");

    const newdate = `${day} ${month} ${year}`;
    setnDate(newdate);
  }, [pDate]);

  return [ndate];
};

export default useDate;
