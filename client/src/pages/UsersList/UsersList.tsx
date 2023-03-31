import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../common/types";
import { AddUserIcon, DeleteIcon, EditIcon, InspectUserIcon } from "../../assets/Icons";
import { Loader } from "../../components/Loader";
import { useUsers } from "../../context/UserProvider";
import "./styles.module.css";

export default function UsersList() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { users, fetchUsersList, deleteUser } = useUsers();

  const HeaderComponent = () => (
    <>
      <h2>User List</h2>
      <AddUserIcon onClick={() => navigate("/add")} />
    </>
  );

  const handleDeleteUser = async (id: User["id"]) => {
    setLoading(true);

    try {
      await deleteUser(id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && !users.length && (
        <>
          <HeaderComponent />
          <p>Can't find users.</p>
        </>
      )}
      {!loading && !!users.length && (
        <>
          <HeaderComponent />

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Active</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {React.Children.toArray(
                users.map((user) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {/* <td>{user.state ? "Active" : "Inactive"}</td> */}
                    <td>
                      <InspectUserIcon onClick={() => navigate(`/show/${user.id}`)} />
                      <EditIcon onClick={() => navigate(`/edit/${user.id}`)} />
                      <DeleteIcon onClick={() => handleDeleteUser(user.id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
