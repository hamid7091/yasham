import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (
  getOrderList,
  getFilteredOrderListAuto,
  isFiltered,
  isSom,
  totalPages,
  pageNum,
  filterTotalPages,
  filterPageNum
) => {
  const [shouldAttachEventListener, setShouldAttachEventListener] =
    useState(false);
  const [
    shouldAttachFilteredEventListener,
    setShouldAttachFilteredEventListener,
  ] = useState(false);

  const handleScroll = useCallback(() => {
    console.log("created");
    if (
      !isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      getOrderList();
      setShouldAttachEventListener(true);
    } else if (
      isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      getFilteredOrderListAuto();
      setShouldAttachFilteredEventListener(true);
    }
  }, [isFiltered, isSom]);

  console.log(totalPages);
  console.log(pageNum);
  useEffect(() => {
    totalPages >= pageNum && !isFiltered && setShouldAttachEventListener(true);
    filterTotalPages >= filterPageNum &&
      isFiltered &&
      setShouldAttachFilteredEventListener(true);
  }, [isFiltered, totalPages, pageNum, filterTotalPages, filterPageNum]);

  return {
    handleScroll,
    shouldAttachEventListener,
    shouldAttachFilteredEventListener,
  };
};

export default useInfiniteScroll;
