import api from "../../utils/api";
// import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function google({ payload }) {
  let googleUrl = `${API_ENDPOINTS.GOOGLE}`;
  const response = await api.post(googleUrl, payload);
  return response;
}

export default {
  useGoogleService: () =>
    useMutation({
      mutationFn: google,
    }),
};
