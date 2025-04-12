import api from "../../utils/api";
// import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function getUser({ params }) {
  let url = `${API_ENDPOINTS.GET_USER}/${params?.username}`;
  const response = await api.get(url);
  return response;
}

export default {
  useGetUserService: () =>
    useMutation({
      mutationFn: getUser,
    }),
};
