import React from "react";

const PopupBackground = ({
  isPopupActive,
  handleStartDateChange,
  handleEndDateChange,
  setStatusField,
}) => {
  const handleClosePopup = () => {
    isPopupActive(false);
    handleStartDateChange && handleStartDateChange(null);
    handleEndDateChange && handleEndDateChange(null);
    setStatusField && setStatusField(null);
  };
  return (
    <div className="popup-background show" onClick={handleClosePopup}></div>
  );
};

export default PopupBackground;
