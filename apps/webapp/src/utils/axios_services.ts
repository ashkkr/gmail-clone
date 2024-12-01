import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleMarkAsReadApiCall = async (
  emailIds: readonly number[],
  userId: number,
) => {
  const response = await api.post("markemailsread", { emailIds, userId });
  const data = response.data;
  return data;
};
