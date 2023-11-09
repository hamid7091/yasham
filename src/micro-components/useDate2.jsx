import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";

const useDate = (pDate) => {
  moment.loadPersian();
  const [ndate, setnDate] = useState(null);
  useEffect(() => {
    const preFormatedDate = pDate;
    const formatedDate = moment(preFormatedDate, "jYYYY-jM-jD").format(
      "jYYYY/jM/jD"
    );
    setnDate(formatedDate);
  }, [pDate]);

  return [ndate];
};

export default useDate;
