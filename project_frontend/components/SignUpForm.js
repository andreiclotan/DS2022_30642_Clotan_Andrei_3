import { useRouter } from "next/router";
import { use, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, sign_up } from "../api/login";
import { loginAction } from "../store/actions/authentication";
import styles from "../styles/Login.module.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const router = useRouter();
  const onSubmit = async () => {
    if (password.length < 8) {
      setError(true);
      setErrorText("Password must be 8+ characters");
      return null;
    }
    if (password != confirmation) {
      setError(true);
      setErrorText("Passwords do not match.");
      return null;
    }
    setError(false);
    await sign_up(username, password, confirmation).then((response) => {
      setError(true);
      response.status.code == 400
        ? setErrorText("Email already used.")
        : router.push("/");
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
        />
      </div>
      <div className={styles.lineContainer}>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <div className={styles.lineContainer}>
        <span>Password confirmation</span>
        <input
          type="password"
          value={confirmation}
          onChange={({ target }) => {
            setConfirmation(target.value);
          }}
        />
      </div>
      {error ? (
        <div className={styles.lineContainer}>
          <p className={styles.error}>{errorText}</p>
        </div>
      ) : null}

      <button className={styles.button} onClick={onSubmit}>
        Sign Up
      </button>
      <div className={styles.already_user}>
        <span>Already an user? </span>
        <span
          className={styles.clickable_span}
          onClick={() => router.push("/")}
        >
          Log in
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
