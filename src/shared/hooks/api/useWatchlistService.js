import api from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function getWatchlist({ query }) {
  const response = await api.get(
    `${API_ENDPOINTS.GET_WATCHLIST}?limit=${query?.limit}&page=${query?.page}`
  );
  return response;
}

async function deleteFromWatchlist({ params }) {
  let url = `${API_ENDPOINTS.DELETE_WATCHLIST}/${params?.watchlistId}`;
  const response = await api.delete(url);
  return response;
}

export default {
  useGetWatchlistService: () =>
    useMutation({
      mutationFn: getWatchlist,
    }),
  useDeleteFromWatchlistService: () =>
    useMutation({
      mutationFn: deleteFromWatchlist,
    }),
};
