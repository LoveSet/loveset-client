import api from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function getContent() {
  let url = API_ENDPOINTS.GET_CONTENT;
  const response = await api.get(url);
  return response;
}

export default {
  useGetContentService: () =>
    useMutation({
      mutationFn: getContent,
    }),
};
