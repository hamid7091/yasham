import React from "react";
import ThunderIcon from "../assets/svg-icons/ThunderIcon";
import { Link } from "react-router-dom";

const InventoryItemCard = ({ data }) => {
  return (
    <Link to={`/stock/${data.stockID}`}>
      <div
        className={`bg-white rounded-5 p-3 drop-shadow mb-3 d-flex align-items-center gap-2 ${
          data.stockStatus === 0
            ? "rborder-red-thick"
            : data.stockStatus === 1
            ? "rborder-yellow-thick"
            : "rborder-green-thick"
        } `}
      >
        <div>
          <img
            src={data.stockPicture}
            width={60}
            height={60}
            className="rounded-circle"
            alt=""
          />
        </div>
        <div className="flex-grow-1">
          <div className="bold-default">{data.stockName}</div>
          <div className="grey-default-thin d-flex gap-1">
            <span>موجودی :</span>
            <span>{(+data.stockAmount).toLocaleString()}</span>
            <span>{data.stockUnit}</span>
          </div>
        </div>
        <div>
          <ThunderIcon />
        </div>
      </div>
    </Link>
  );
};

export default InventoryItemCard;
