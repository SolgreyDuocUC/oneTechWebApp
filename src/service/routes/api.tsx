import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8050",
  headers: {
    "Content-Type": "application/json",
  },
});