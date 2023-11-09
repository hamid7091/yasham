import React from "react";

const FieldToBeRepeated = ({ disabled, onRemove, index, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value, event.target.id);

    console.log(event.target.id);
  };
  //   const testfunc = (event) => {
  //     console.log(event.target.value);
  //   };
  return (
    <div className="d-flex align-items-center mt-4 ">
      <div className="d-sm-flex align-items-center gap-2 d-grid flex-grow-1">
        <div className="d-flex align-items-center w-50 ">
          <label htmlFor="tooth-color" className="bold500-large my-sm-3 px-3">
            رنگ
          </label>
          <select
            className="tooth-color form-select form-control rounded-pill my-3 py-2 border-0 w-100 me-sm-2 drop-shadow"
            name="tooth-color"
            id={index}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="B3">B3</option>
            <option value="B4">B4</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
            <option value="C3">C3</option>
            <option value="C4">C4</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
            <option value="D4">D4</option>
            <option value="BL1">BL1</option>
            <option value="BL2">BL2</option>
            <option value="BL3">BL3</option>
            <option value="BL4">BL4</option>
          </select>
        </div>
        <div className="d-flex align-items-center mt-s-3">
          <label htmlFor="tooth-number" className="bold500-large my-sm-3 px-3">
            شماره
          </label>
          <input
            className="tooth-info rounded-pill my-3 py-2 px-3 border-0 drop-shadow me-sm-3"
            type="text"
            id="tooth-number"
            name="tooth-number"
          />
        </div>
      </div>
      <button
        className={`delete-field-btn  has-pointer me-2 border-0 rounded-circle text-white bg-red fw-bold ${
          disabled ? "disabled" : ""
        }`}
        type="button"
        onClick={() => onRemove(index)}
      ></button>
    </div>
  );
};

export default FieldToBeRepeated;
