import axios from "axios";

export const getUsersRequest = async () => await axios.get(`http://localhost:8000/api/users`);

export const getUserRequest = async (id: string | number) => await axios.get(`http://localhost:8000/api/users/${id}`);

export const postUserRequest = async (data: any) => await axios.post("http://localhost:8000/api/users", data);

export const updateUserRequest = async (id: string | number, data: any) => await axios.put(`http://localhost:8000/api/users/${id}`, data);

export const deleteUserRequest = async (id: string | number) => await axios.delete(`http://localhost:8000/api/users/${id}`);
