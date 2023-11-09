import { useState, useEffect } from "react";

function useMathRound(initialNum) {
  console.log(initialNum);
  const [roundedNum, setRoundNum] = useState(initialNum);

  useEffect(() => {
    setRoundNum(Math.round(initialNum));
  }, [initialNum]);

  return { roundedNum };
}

export default useMathRound;
