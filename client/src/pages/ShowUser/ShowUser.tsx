import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../../common/types";
import { Loader } from "../../components/Loader";
import { getUserRequest } from "../../services";
import styles from "./styles.module.css";

export default function ShowUser() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      if (id) {
        try {
          const res = await getUserRequest(id);
          // setUser(res.data);
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
      {loading && <Loader />}
      {!loading && !user && <p>Can't get User data.</p>}
      {!loading && user && (
        <>
          <p>
            <strong>#</strong>
            {user?.id}
          </p>
          <p>
            <strong>Name: </strong>
            {user?.name}
          </p>
          <p>
            <strong>Email: </strong>
            {user?.email}
          </p>
          {/* <p>
        <strong>State: </strong>
        {user?.state ? "Active" : "Inactive"}
      </p> */}
        </>
      )}

      <button type="button" onClick={() => navigate("/")}>
        Go back
      </button>
    </div>
  );
}
