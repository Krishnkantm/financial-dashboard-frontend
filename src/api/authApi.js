import api from "./axios";

export const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};