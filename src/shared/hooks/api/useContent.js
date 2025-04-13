import api from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function getContent({ params, query }) {
  let url = `${API_ENDPOINTS.GET_CONTENT_DETAILS}/${params?.contentId}`;

  if (query?.userId) {
    url += `?userId=${query?.userId}`;
  }

  const response = await api.get(url);
  return response;
}

async function getStreamingAvailability({ params, query }) {
  let url = `${API_ENDPOINTS.GET_STREAMING_AVAILABILITY}/${params?.contentId}`;

  if (query?.userId) {
    url += `?userId=${query?.userId}`;
  }

  const response = await api.get(url);
  return response;
}

export default {
  useGetContentService: () =>
    useMutation({
      mutationFn: getContent,
    }),
  useGetStreamingAvailabilityService: () =>
    useMutation({
      mutationFn: getStreamingAvailability,
    }),
};
