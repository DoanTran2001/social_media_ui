import React, { useState, useEffect } from "react";

interface DebounceProps {
  value: string;
  delay: number;
}

function useDebounce(props: DebounceProps) {
  const { value, delay } = props
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
