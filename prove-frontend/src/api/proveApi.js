import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const startSession = ({ phoneNumber, flowType }) => {
  return axios.post(`${BASE_URL}/start-session`, { phoneNumber, flowType });
};

export const validate = ({ correlationId }) => {
  return axios.post(`${BASE_URL}/validate`, { correlationId });
};

export const complete = ({ correlationId, individual }) => {
  return axios.post(`${BASE_URL}/complete`, { correlationId, individual });
};
