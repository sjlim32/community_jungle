import { useState } from "react";

/* 
  ? HOW TO USE
  
  const { isOn, toggle } = useToggle(false);
  <button onClick={toggle} />
*/

export default function useToggle(initialValue) {
  const [isOn, setIsOn] = useState(initialValue);
  const toggle = () => {
    setIsOn((curr) => !curr);
  };

  return { isOn, toggle };
}
