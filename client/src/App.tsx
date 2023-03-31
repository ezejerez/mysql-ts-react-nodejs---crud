import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./context/UserProvider";
import { AddUser } from "./pages/AddUser";
import { EditUser } from "./pages/EditUser";
import { ShowUser } from "./pages/ShowUser";
import { UsersList } from "./pages/UsersList";

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/show/:id" element={<ShowUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="*" element={<h1>404. Not found page.</h1>} />
      </Routes>
    </UserContextProvider>
  );
}
