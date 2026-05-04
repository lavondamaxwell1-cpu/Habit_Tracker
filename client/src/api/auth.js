import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axios.post(`${API_URL}/forgot-password`, data);
  return response.data;
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const resetPassword = async (data) => {
  const response = await axios.post(`${API_URL}/reset-password`, data);
  return response.data;
};