// src/services/userService.ts
import axios from "axios";
import { User } from "../interfaces/User";

const API_URL =
  process.env.API_URL || "https://mern-backend-test-tau.vercel.app/api/users";

export const getUsers = () => axios.get<User[]>(API_URL);
export const getUserById = (id: string) => axios.get<User>(`${API_URL}/${id}`);
export const createUser = (user: User) => axios.post<User>(API_URL, user);
export const updateUser = (id: string, user: User) =>
  axios.put<User>(`${API_URL}/${id}`, user);
export const deleteUser = (id: string) =>
  axios.delete<User>(`${API_URL}/${id}`);
