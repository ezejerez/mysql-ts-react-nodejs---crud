import { createContext } from "react";
import { IUserContextValue } from "./interfaces";

export const UserContext = createContext<IUserContextValue>({
  users: [],
  fetchUsersList: async () => {},
  deleteUser: async () => {},
  createUser: async () => {},
  updateUser: async () => {},
});
