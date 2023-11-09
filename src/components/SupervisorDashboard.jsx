import React from "react";
import SupervisorDashboardCard from "./SupervisorDashboardCard";

const SupervisorDashboard = ({ data }) => {
  return (
    data && (
      <div className="mb-100 px-3">
        {data.map((dep, index) => {
          return <SupervisorDashboardCard key={index} data={dep} />;
        })}
      </div>
    )
  );
};

export default SupervisorDashboard;
