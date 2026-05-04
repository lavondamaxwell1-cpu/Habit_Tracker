import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/habits";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getHabits = async () => {
  const { data } = await axios.get(API_URL, getConfig());
  return data;
};

export const createHabit = async (habitData) => {
  const { data } = await axios.post(API_URL, habitData, getConfig());
  return data;
};

export const updateHabit = async (id, habitData) => {
  const { data } = await axios.put(`${API_URL}/${id}`, habitData, getConfig());
  return data;
};

export const completeHabit = async (id) => {
  const { data } = await axios.put(
    `${API_URL}/${id}/complete`,
    {},
    getConfig(),
  );
  return data;
};
export const deleteHabit = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, getConfig());
  return data;
};
