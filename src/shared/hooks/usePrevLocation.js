import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";

const usePrevLocation = (location) => {
  const prevLocRef = useRef(location);

  useEffect(() => {
    prevLocRef.current = location;
  }, [location]);

  return prevLocRef.current;
};

export default usePrevLocation;
