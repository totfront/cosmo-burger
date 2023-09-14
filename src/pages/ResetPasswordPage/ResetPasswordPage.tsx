import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { resetPassword } from "../../services/apis/authorizationApi";
import { loginPath } from "../../shared/paths";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passPhrase, setPassPhrase] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({ password, token: passPhrase })
      .then(({ success }) => {
        if (success) {
          navigate(loginPath);
        } else {
          throw new Error("Response contains { success: false }");
        }
      })
      .catch((err: Error) => console.error(err));
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Set a new password
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput
          extraClass={styles.inputPassword}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"email"}
          placeholder="Enter a new password"
        />
        <Input
          extraClass={styles.inputName}
          onChange={(e) => setPassPhrase(e.target.value)}
          name="name"
          value={passPhrase}
          placeholder="Enter the code from the e-mail"
        />
        <Button
          extraClass={styles.submit}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Set
        </Button>
      </form>
      <p className={`text text_type_main-small ${styles.text}`}>
        Remembered old password?{" "}
        <Link className={styles.link} to="/login">
          Log in
        </Link>
      </p>
    </main>
  );
};

export default ResetPasswordPage;
