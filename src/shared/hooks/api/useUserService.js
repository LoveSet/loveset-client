import api from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function onboarding({ payload }) {
  let url = API_ENDPOINTS.ONBOARDING;
  const response = await api.patch(url, payload);
  return response;
}

async function getUser({ params }) {
  let url = `${API_ENDPOINTS.GET_USER}/${params?.username}`;
  const response = await api.get(url);
  return response;
}

export default {
  useOnboardingService: () =>
    useMutation({
      mutationFn: onboarding,
    }),
  useGetUserService: () =>
    useMutation({
      mutationFn: getUser,
    }),
};
