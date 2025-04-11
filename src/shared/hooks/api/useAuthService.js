import api from "../../utils/api";
// import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function signup({ query, payload }) {
  let signupUrl = `${API_ENDPOINTS.SIGNUP}`;
  if (query?.ref) {
    signupUrl += `?ref=${query?.ref}`;
  }

  if (query?.returnTo) {
    signupUrl += `${query?.ref ? "&" : "?"}returnTo=${query?.returnTo}`;
  }

  if (query?.trackerLinkName) {
    signupUrl += `?trackerLinkName=${query?.trackerLinkName}`;
  }

  const response = await api.post(signupUrl, payload);
  return response;
}

async function login(payload) {
  const response = await api.post(API_ENDPOINTS.LOGIN, payload);
  return response;
}

async function google({ query, payload }) {
  let googleUrl = `${API_ENDPOINTS.GOOGLE}`;

  if (query?.ref) {
    googleUrl += `?ref=${query?.ref}`;
  }

  if (query?.trackerLinkName) {
    googleUrl += `?trackerLinkName=${query?.trackerLinkName}`;
  }

  const response = await api.post(googleUrl, payload);
  return response;
}

async function sendVerificationEmail(payload) {
  const response = await api.post(
    API_ENDPOINTS.SEND_VERIFICATION_EMAIL,
    payload
  );
  return response;
}

async function verifyEmail(payload) {
  const response = await api.post(API_ENDPOINTS.VERIFY_EMAIL, payload);
  return response;
}

async function forgotPassword(payload) {
  const response = await api.post(API_ENDPOINTS.FORGOT_PASSWORD, payload);
  return response;
}

async function autoLogin(payload) {
  const response = await api.post(API_ENDPOINTS.AUTO_LOGIN, payload);
  return response;
}

async function resetPassword({ query, payload }) {
  const response = await api.post(`${API_ENDPOINTS.RESET_PASSWORD}`, payload);
  return response;
}

export default {
  useSignupService: (...args) => useMutation(signup, ...args),
  useLoginService: (...args) => useMutation(login, ...args),
  useGoogleService: (...args) => useMutation(google, ...args),
  useSendVerificationEmailService: (...args) =>
    useMutation(sendVerificationEmail, ...args),
  useVerifyEmailService: (...args) => useMutation(verifyEmail, ...args),
  useForgotPasswordService: (...args) => useMutation(forgotPassword, ...args),
  useAutoLoginService: (...args) => useMutation(autoLogin, ...args),
  useResetPasswordService: (...args) => useMutation(resetPassword, ...args),
};
