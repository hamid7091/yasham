import React from "react";
import PackageCard from "./PackageCard";
import Message from "../micro-components/Message";

const ShippingDashboard = ({ packagesArray }) => {
  console.log(packagesArray);
  return (
    packagesArray && (
      <div className="mb-100 px-3 mt-3">
        <p className="bold-xxlarge pe-2">لیست تمامی مرسوله‌ها</p>
        {packagesArray.length ? (
          packagesArray.map((pkg, index) => {
            return (
              <PackageCard
                key={index}
                packageData={pkg}
                isFromShipping={true}
              />
            );
          })
        ) : (
          <Message>در حال حاظر وظیفه ای به شما واگذار نشده است</Message>
        )}
      </div>
    )
  );
};

export default ShippingDashboard;
