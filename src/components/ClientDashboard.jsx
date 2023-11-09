import React, { useState } from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";
import QuestionIcon from "../assets/svg-icons/QuestionIcon";
import ClientAssignedCard from "./ClientAssignedCard";
import ClientTaskCard from "./ClientTaskCard";
import Message from "../micro-components/Message";

const ClientDashboard = ({ ongoingOrders, assignedTasks }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <>
      <div className="mb-100 px-3">
        <div className="bold-xxlarge mt-4 pe-3 mb-0 ">
          <span className="ms-3">وظایف در انتظار تایید</span>
          <span>
            <Popover
              isOpen={isPopoverOpen}
              positions={["bottom", "top"]}
              containerStyle={{
                maxWidth: "576px",
              }}
              onClickOutside={() => {
                setIsPopoverOpen(!isPopoverOpen);
              }}
              content={({
                position,
                childRect,
                popoverRect,
                nudgedLeft,
                nudgedTop,
              }) => (
                <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                  position={position}
                  childRect={childRect}
                  popoverRect={popoverRect}
                  arrowColor={"rgba(0,0,0,0.75"}
                  arrowSize={10}
                  arrowStyle={{ opacity: 0.7 }}
                  className="popover-arrow-container"
                  arrowClassName="popover-arrow"
                >
                  <p
                    className="p-2 rounded-1"
                    style={{
                      border: "2px solid #000",
                      backgroundColor: "#000",
                      opacity: "0.75",
                      color: "#fff",
                    }}
                  >
                    وظایفی که از طرف سوپروایزر لابراتوار یاشام به شما واگذار شده
                    است
                  </p>
                </ArrowContainer>
              )}
            >
              <span
                className="has-pointer"
                onClick={() => {
                  setIsPopoverOpen(!isPopoverOpen);
                }}
              >
                <QuestionIcon />
              </span>
            </Popover>
          </span>
        </div>

        {assignedTasks ? (
          assignedTasks.map((order, index) => {
            return <ClientAssignedCard key={index} order={order} />;
          })
        ) : (
          <Message>وظیفه ای به شما اساین نشده است</Message>
        )}

        <p className="bold-xxlarge mt-4 pe-4 mb-0">سفارش های اخیر</p>
        {ongoingOrders ? (
          ongoingOrders.map((order, index) => {
            return <ClientTaskCard key={index} order={order} />;
          })
        ) : (
          <Message>سفارش فعال وجود ندارد</Message>
        )}
      </div>
    </>
  );
};

export default ClientDashboard;
