import { useRouter } from "next/router";
import { use, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../api/login";
import { loginAction } from "../store/actions/authentication";
import styles from "../styles/Login.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async () => {
    logIn(username, password).then((response) => {
      response.status == 401 ? setError(true) : setError(false);
      response.status != 401
        ? loginAction(true, dispatch, response.status, router)
        : null;
    });
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Please Log In</h1>
      <div className={styles.lineContainer}>
        <span>Email</span>
        <input
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        ></input>
      </div>
      <div className={styles.lineContainer}>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        ></input>
      </div>
      {error ? (
        <div className={styles.lineContainer}>
          <p className={styles.error}>Invalid username or password.</p>
        </div>
      ) : null}
      <div className={styles.lineContainer}>
        <button className={styles.button} onClick={onSubmit}>
          Log In
        </button>
        <button
          className={styles.button}
          onClick={() => router.push("/sign_up")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
