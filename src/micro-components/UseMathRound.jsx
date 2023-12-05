import { useState, useEffect } from "react";

function useMathRound(initialNum) {
  const [roundedNum, setRoundNum] = useState(initialNum);

  useEffect(() => {
    console.log(initialNum === NaN);

    setRoundNum(Math.round(initialNum));
  }, [initialNum]);

  return roundedNum;
}

export default useMathRound;
