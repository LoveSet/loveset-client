import api from "../../utils/api";
// import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../config/endpoints";

async function getCustomer() {
  const response = await api.get(API_ENDPOINTS.GET_CUSTOMER);
  return response;
}

async function getBillingHistory() {
  const response = await api.get(API_ENDPOINTS.GET_BILLING_HISTORY);
  return response;
}

async function unsubscribe(payload) {
  const response = await api.post(API_ENDPOINTS.UNSUBSCRIBE, payload);
  return response;
}

export default {
  useGetCustomerService: () =>
    useMutation({
      mutationFn: getCustomer,
    }),
  useGetBillingHistoryService: () =>
    useMutation({
      mutationFn: getBillingHistory,
    }),
  useUnsubscribeService: () =>
    useMutation({
      mutationFn: unsubscribe,
    }),
};
