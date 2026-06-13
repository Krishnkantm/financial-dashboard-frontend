import api from "./axios";

export const getRecords = async (params = {}) => {
  const response = await api.get("/records", { params });
  return response.data;
};

export const createRecord = async (recordData) => {
  const response = await api.post("/records", recordData);
  return response.data;
};

export const getRecordById = async (id) => {
  const response = await api.get(`/records/${id}`);
  return response.data;
};


export const updateRecord = async (id, recordData) => {
  const response = await api.put(`/records/${id}`, recordData);
  return response.data;
};

export const deleteRecord = async (id) => {
  const response = await api.delete(`/records/${id}`);
  return response.data;
};