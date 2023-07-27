import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { resetPassword } from "../services/apis/authorizationApi";
import { loginPath } from "../shared/paths";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passPhrase, setPassPhrase] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
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
        Восстановление пароля
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput
          extraClass={styles.inputPassword}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"email"}
          placeholder="Введите новый пароль"
        />
        <Input
          extraClass={styles.inputName}
          onChange={(e) => setPassPhrase(e.target.value)}
          name="name"
          value={passPhrase}
          placeholder="Введите код из письма"
        />
        <Button
          extraClass={styles.submit}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
        </Button>
      </form>
      <p className={`text text_type_main-small ${styles.text}`}>
        Вспомнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ResetPasswordPage;
