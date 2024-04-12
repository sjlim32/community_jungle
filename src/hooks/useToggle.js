import { useState } from "react";

export default function useToggle(initialValue) {
  const [isOn, setIsOn] = useState(initialValue);
  const toggle = () => {
    setIsOn((curr) => {
      return !curr;
    });
  };

  return { isOn, toggle };
}
