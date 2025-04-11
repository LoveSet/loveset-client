import api from "../../utils/api";
// import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function getUser({ params, query }) {
  let url = `${API_ENDPOINTS.GET_USER}/${params?.username}`;

  if (query?.viewerUserId) {
    url += `?viewerUserId=${query?.viewerUserId}`;
  }

  if (query?.token) {
    // no need for &, not using it with viewerUserId
    url += `?token=${query?.token}`;
  }

  const response = await api.get(url);
  return response;
}

async function getUserById({ params, query }) {
  let url = `${API_ENDPOINTS.GET_USER_BY_ID}/${params?.id}`;

  if (query?.viewerUserId) {
    url += `?viewerUserId=${query?.viewerUserId}`;
  }

  if (query?.token) {
    // no need for &, not using it with viewerUserId
    url += `?token=${query?.token}`;
  }

  const response = await api.get(url);
  return response;
}

async function updateProfile(payload) {
  const response = await api.patch(API_ENDPOINTS.UPDATE_PROFILE, payload);
  return response;
}

async function updatePassword(payload) {
  const response = await api.patch(API_ENDPOINTS.UPDATE_PASSWORD, payload);
  return response;
}

async function updateMessageSettings(payload) {
  const response = await api.patch(
    API_ENDPOINTS.USER_MESSAGE_SETTINGS,
    payload
  );
  return response;
}

async function updateStripeDetails({ params, payload }) {
  let url = `${API_ENDPOINTS.USER_STRIPE}/${params?.userId}`;
  const response = await api.patch(url, payload);
  return response;
}

async function searchUsers({ query }) {
  let url = `${API_ENDPOINTS.SEARCH_USERS}?q=${query?.q}`;

  if (query?.limit) {
    url += `&limit=${query?.limit}`;
  }

  const response = await api.get(url);

  return response;
}

async function startFreeTrial(payload) {
  const response = await api.post(API_ENDPOINTS.START_FREE_TRIAL, payload);
  return response;
}

export default {
  useGetUserService: (...args) => useMutation(getUser, ...args),
  useGetUserByIdService: (...args) => useMutation(getUserById, ...args),
  useUpdateProfileService: (...args) => useMutation(updateProfile, ...args),
  useUpdatePasswordService: (...args) => useMutation(updatePassword, ...args),
  useUpdateMessageSettingsService: (...args) =>
    useMutation(updateMessageSettings, ...args),
  useUpdateStripeDetailsService: (...args) =>
    useMutation(updateStripeDetails, ...args),
  useSearchUsersService: (...args) => useMutation(searchUsers, ...args),
  useStartFreeTrialService: (...args) => useMutation(startFreeTrial, ...args),
};
