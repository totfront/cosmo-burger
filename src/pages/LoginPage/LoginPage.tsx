import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../index.module.css";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { handleInputChange } from "../../services/helpers";
import { authorizeUser } from "../../services/actions/userAuth";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch: any = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authorizeUser({ email, password }));
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>Вход</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput
          onChange={({ target: { value } }) =>
            handleInputChange(value, setEmail)
          }
          extraClass={styles.inputEmail}
          value={email}
          name={"email"}
          isIcon={false}
          placeholder="E-mail"
        />
        <PasswordInput
          extraClass={styles.inputPassword}
          onChange={({ target: { value } }) =>
            handleInputChange(value, setPassword)
          }
          value={password}
          name={"email"}
          placeholder="Пароль"
        />
        <Button
          extraClass={styles.submit}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>
      <p className={`text text_type_main-small mb-2 ${styles.text}`}>
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/signin">
          Зарегистрироваться
        </Link>
      </p>
      <p className={`text text_type_main-small ${styles.text}`}>
        Забыли пароль?{" "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
