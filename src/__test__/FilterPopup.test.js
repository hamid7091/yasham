import React from "react";
import { render, screen } from "@testing-library/react";
import expect from "jest";
import FilterPopup from "../components/FilterPopup";

describe("FilterPopup component", () => {
  it("should render the component correctly", () => {
    const props = {
      setIsFilterPopupActive: jest.fn(),
      clientsList: [],
      handleStartDateChange: jest.fn(),
      handleEndDateChange: jest.fn(),
      startDate: null,
      endDate: null,
      handleFilter: jest.fn(),
      clientName: null,
      setClientName: jest.fn(),
      filterArea: "",
      isDirect: false,
    };

    const { container } = render(<FilterPopup {...props} />);

    expect(container).toBeInTheDocument();
    expect(screen.getByText("فیلتر")).toBeInTheDocument();
    expect(screen.getByText("از تاریخ :")).toBeInTheDocument();
    expect(screen.getByText("تا تاریخ :")).toBeInTheDocument();
  });

  it("should disable the filter button if start date, end date, or client name are not provided", () => {
    const props = {
      setIsFilterPopupActive: jest.fn(),
      clientsList: [],
      handleStartDateChange: jest.fn(),
      handleEndDateChange: jest.fn(),
      startDate: null,
      endDate: null,
      handleFilter: jest.fn(),
      clientName: null,
      setClientName: jest.fn(),
      filterArea: "",
      isDirect: false,
    };

    const { container } = render(<FilterPopup {...props} />);

    const filterButton = screen.getByText("اعمال فیلتر");

    expect(filterButton.disabled).toBe(true);

    // Set the start date
    props.handleStartDateChange(new Date());
    render(<FilterPopup {...props} />, { container });

    expect(filterButton.disabled).toBe(false);

    // Set the end date
    props.handleEndDateChange(new Date());
    render(<FilterPopup {...props} />, { container });

    expect(filterButton.disabled).toBe(false);

    // Set the client name
    props.setClientName("John Doe");
    render(<FilterPopup {...props} />, { container });

    expect(filterButton.disabled).toBe(false);
  });
});
