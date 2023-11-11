import React from "react";
import UsageCard from "./UsageCard";
import Message from "../micro-components/Message";

const UsageHistory = ({ data }) => {
  console.log(data);
  return (
    <>
      {data ? (
        <div className="pb-3">
          {data.map((item, index) => {
            return <UsageCard key={index} data={item} />;
          })}
        </div>
      ) : (
        <div className="mb-2">
          <Message>در حال حاظر سابقه مصرف وجود ندارد</Message>
        </div>
      )}
    </>
  );
};

export default UsageHistory;
