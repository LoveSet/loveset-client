import axios from "axios";
import { BASE_URL } from "../config/endpoints";
// import { useLocalStorage } from "../hooks/useLocalStorage";
import { GET_STORAGE_ITEM } from "./storage";

const token = GET_STORAGE_ITEM("token");

const defaults = {
  headers: () => ({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  }),
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${BASE_URL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
    }).then(
      (response) => {
        resolve(response?.data);
      },
      (error) => {
        if (error.message) {
          // if the access token is not valid & the user is still loggedIn, this clears localStorage and redirects to login page
          if (
            error?.response?.data?.message == "Please authenticate" &&
            JSON.parse(localStorage.getItem("token"))
          ) {
            localStorage.clear();
            window.location = "/";
          }
          //
          reject(error?.response?.data);
        } else {
          reject(defaults.error);
        }
      }
    );
  });

export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  patch: (...args) => api("patch", ...args),
  delete: (...args) => api("delete", ...args),
};
