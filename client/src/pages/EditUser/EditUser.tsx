import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../../common/types";
import { Loader } from "../../components/Loader";
import { useUsers } from "../../context/UserProvider";
import { getUserRequest } from "../../services";
import styles from "./styles.module.css";

export default function EditUser() {
  const [user, setUser] = useState<Partial<User>>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { updateUser: updateUserReq } = useUsers();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // if (type === "checkbox") {
    //   if (checked) setUser({ ...user, [name]: "1" });
    //   else setUser({ ...user, [name]: "0" });
    // } else
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (id) await updateUserReq(id, user);

      setError("");
      navigate(`/`);
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await getUserRequest(id);

          setUser(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    getUserData();
  }, []);

  return (
    <div className={styles["container"]}>
      <h1>{`Edit User #${user?.id || ""}`}</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles["input-container"]}>
          <strong>Name: </strong>
          <input name="name" value={user?.name || ""} onChange={handleChange} required disabled={loading} />
        </div>

        <div className={styles["input-container"]}>
          <strong>Email: </strong>
          <input type="email" name="email" value={user?.email || ""} onChange={handleChange} required disabled={loading} />
        </div>

        {/* <div>
          <strong>Active: </strong>
          <input type="checkbox" name="state" checked={user?.state === "0" ? false : true} onChange={handleChange} />
        </div> */}

        {error && (
          <span style={{ color: "red" }}>
            <strong>{error}</strong>
          </span>
        )}

        {loading && <Loader />}

        <input type="submit" value="Update User" disabled={loading} />
        <button type="button" onClick={() => navigate("/")} disabled={loading}>
          Go back
        </button>
      </form>
    </div>
  );
}
