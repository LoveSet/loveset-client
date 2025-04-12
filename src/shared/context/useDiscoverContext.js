import React, { createContext, useContext, useState } from "react";
import useDiscoverService from "../hooks/api/useDiscoverService";
import { toast } from "react-toastify";

const DiscoverContext = createContext();

const DiscoverProvider = ({ children }) => {
  // const [content, setContent] = useState();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: getCache } = useDiscoverService.useGetCacheService();
  const { mutateAsync: getContent } = useDiscoverService.useGetContentService();

  async function handleGetCache() {
    try {
      const response = await getCache();
      if (response) {
        return response?.data;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again or contact support");
    }
  }

  async function handleGetContent() {
    try {
      const response = await getContent();
      if (response) {
        return response?.data;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again or contact support");
    }
  }

  async function handleDiscovery(_movies) {
    setLoading(true);
    const cache = await handleGetCache();
    if (cache?.length > 0) {
      setMovies([..._movies, ...cache.reverse()]);
    } else {
      const content = await handleGetContent();
      if (content?.length > 0) {
        setMovies([..._movies, ...content.reverse()]);
      } else {
        toast.error("An error occurred. Please try again or contact support");
      }
    }
    setLoading(false);
  }

  const value = {
    handleGetContent,
    movies,
    setMovies,
    handleDiscovery,
    loading,
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
