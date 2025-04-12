import api from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function getContent() {
  let url = API_ENDPOINTS.GET_CONTENT;
  const response = await api.get(url);
  return response;
}

async function getCache() {
  let url = API_ENDPOINTS.GET_CACHE;
  const response = await api.get(url);
  return response;
}

async function like(payload) {
  let url = API_ENDPOINTS.LIKE;
  const response = await api.post(url, payload);
  return response;
}

async function dislike(payload) {
  let url = API_ENDPOINTS.DISLIKE;
  const response = await api.post(url, payload);
  return response;
}

export default {
  useGetContentService: () =>
    useMutation({
      mutationFn: getContent,
    }),
  useGetCacheService: () =>
    useMutation({
      mutationFn: getCache,
    }),
  useLikeService: () =>
    useMutation({
      mutationFn: like,
    }),
  useDislikeService: () =>
    useMutation({
      mutationFn: dislike,
    }),
};
