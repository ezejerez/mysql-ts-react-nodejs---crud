import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../common/types";
import { Loader } from "../../components/Loader";
import { useUsers } from "../../context/UserProvider";
import "./styles.module.css";
import styles from "./styles.module.css";

const INITIAL_DATA: Omit<User, "id"> = { name: "", email: "" };

export default function AddUser() {
  const [newUser, setNewUser] = useState(INITIAL_DATA);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { createUser } = useUsers();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // if (type === "checkbox") {
    //   if (checked) setNewUser({ ...newUser, [name]: "1" });
    //   else setNewUser({ ...newUser, [name]: "0" });
    // } else
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await createUser(newUser);

      setNewUser(INITIAL_DATA);
      setError("");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <h1>Add new User</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles["input-container"]}>
          <label>Name: </label>
          <input name="name" value={newUser.name} onChange={handleChange} required disabled={loading} />
        </div>

        <div className={styles["input-container"]}>
          <label>Email: </label>
          <input type="email" name="email" value={newUser.email} onChange={handleChange} required disabled={loading} />
        </div>

        {/* <div>
          <label>Active: </label>
          <input type="checkbox" name="state" checked={newUser.state === "0" ? false : true} onChange={handleChange} />
        </div> */}

        {error && (
          <span style={{ color: "red" }}>
            <strong>{error}</strong>
          </span>
        )}

        {loading && <Loader />}

        <input type="submit" value="Create User" disabled={loading} />
        <button type="button" onClick={() => navigate("/")} disabled={loading}>
          Go back
        </button>
      </form>
    </div>
  );
}
