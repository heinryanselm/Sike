import axios from "axios";
import { CreateGamePayload, JoinGamePayload } from "../types/game";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sike-backend.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const createGame = async (payload: CreateGamePayload) => {
  const response = await api.post("/room/create", {
    username: payload.username,
    rounds: payload.rounds,
  });
  return response.data;
};

export const joinGame = async (payload: JoinGamePayload) => {
  const response = await api.post(`/room/join/${payload.roomId}`, {
    username: payload.username,
  });
  return response.data;
};
