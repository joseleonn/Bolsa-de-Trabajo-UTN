import React, { useState, useEffect } from "react";

const useTimeout = () => {
  const [showText, setShowText] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShowText(true);
    }, 1000);

    const timeout2 = setTimeout(() => {
      setShowText2(true);
    }, 3500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return { showText, showText2 };
};

export default useTimeout;
