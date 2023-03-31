import { User } from "../../../common/types";

export interface IUserContextValue {
  users: User[];
  fetchUsersList: () => Promise<void>;
  createUser: (newUser: Omit<User, "id">) => Promise<void>;
  deleteUser: (id: string | number) => Promise<void>;
  updateUser: (id: string | number, data: any) => Promise<void>;
}
