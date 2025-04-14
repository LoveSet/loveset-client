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
      toast.error("An error occurred. Please try again.");
    }
  }

  async function handleGetContent() {
    try {
      const response = await getContent();
      if (response) {
        return response?.data;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  // async function handleGetContent() {
  //   let attempt = 0;
  //   const backoffCap = 10000; // Maximum delay between retries (10 seconds)

  //   while (true) {
  //     // Keep trying indefinitely
  //     try {
  //       attempt++;
  //       const response = await getContent();
  //       if (response) {
  //         // If we retried many times, maybe show a success toast
  //         if (attempt > 1) {
  //           toast.success("Connection restored successfully!");
  //         }
  //         return response?.data;
  //       }
  //     } catch (error) {
  //       // Calculate backoff delay - exponential but with a maximum cap
  //       const backoffDelay = Math.min(Math.pow(2, attempt) * 100, backoffCap);

  //       console.log(
  //         `Attempt ${attempt} failed. Retrying in ${backoffDelay}ms...`
  //       );

  //       // Show temporary toast that we're retrying
  //       // toast.info(`Connection issue. Retrying... (attempt ${attempt})`, {
  //       //   autoClose: backoffDelay,
  //       //   closeOnClick: false,
  //       // });

  //       // Wait before retrying
  //       await new Promise((resolve) => setTimeout(resolve, backoffDelay));

  //       // The loop will continue to the next iteration automatically
  //     }
  //   }
  // }

  async function handleDiscovery(_movies = []) {
    setLoading(true);
    const cache = await handleGetCache();
    if (cache?.length > 0) {
      setMovies([..._movies, ...cache.reverse()]);
    } else {
      const content = await handleGetContent();
      if (content?.length > 0) {
        setMovies([..._movies, ...content.reverse()]);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    setLoading(false);
  }

  async function handleReplenish() {
    if (loading) return;
    if (movies?.length > 4) return;
    setLoading(true);
    const content = await handleGetContent();
    if (content?.length > 0) {
      setMovies((prev) => [...[...prev].reverse(), ...content].reverse());
    } else {
      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  }

  const value = {
    handleGetContent,
    movies,
    setMovies,
    handleDiscovery,
    loading,
    handleReplenish,
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
