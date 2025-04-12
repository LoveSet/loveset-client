import React, { createContext, useContext, useState } from "react";
import useDiscoverService from "../hooks/api/useDiscoverService";
import { toast } from "react-toastify";

const DiscoverContext = createContext();

const DiscoverProvider = ({ children }) => {
  const { mutateAsync: getContent } = useDiscoverService.useGetContentService();

  async function handleGetContent() {
    try {
      const response = await getContent();
      if (response) {
        return response;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again or contact support");
    }
  }

  const value = {
    handleGetContent,
  };

  return (
    <DiscoverContext.Provider value={value}>
      {children}
    </DiscoverContext.Provider>
  );
};

function useDiscover() {
  const context = useContext(DiscoverContext);
  if (context === undefined) {
    throw new Error("useDiscover must be used within a DiscoverProvider");
  }
  return context;
}

export { DiscoverProvider, useDiscover };
