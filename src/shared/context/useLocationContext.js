import React, { useEffect, useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const LocationContext = createContext();

const LocationProvider = ({ ...props }) => {
  const location = useLocation();
  const [presentLocation, setPresentLocation] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    setPreviousLocation(presentLocation);
    setPresentLocation(location);
  }, [location]);

  const value = {
    previousLocation,
    presentLocation,
  };

  return <LocationContext.Provider value={value} {...props} />;
};

function usePreviousLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error(
      "usePreviousLocation must be used within a LocationProvider"
    );
  }

  return {
    previousLocation: context.previousLocation,
    presentLocation: context.presentLocation,
  };
}

export { LocationProvider, usePreviousLocation };
