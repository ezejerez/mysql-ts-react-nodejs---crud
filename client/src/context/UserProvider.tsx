import { useContext, useState } from "react";
import { User } from "../../../common/types";
import { deleteUserRequest, getUsersRequest, postUserRequest, updateUserRequest } from "../services";
import { UserContext } from "./UserContext";

export const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsersList() {
    const res = await getUsersRequest();
    setUsers(res.data);
  }

  async function deleteUser(id: string | number) {
    await deleteUserRequest(id);
    setUsers(users.filter((user) => user.id !== id));
  }

  async function createUser(newUser: Omit<User, "id">) {
    await postUserRequest(newUser);
  }

  async function updateUser(id: string | number, data: any) {
    await updateUserRequest(id, data);
  }

  return <UserContext.Provider value={{ users, fetchUsersList, createUser, deleteUser, updateUser }}>{children}</UserContext.Provider>;
};

export function useUsers() {
  const context = useContext(UserContext);

  if (!context) throw new Error("useUsers must be used within a UserContextProvider.");

  return context;
}
