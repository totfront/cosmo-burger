import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { handleInputChange } from "../services/helpers";
import { authorizeUser } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../shared/types/Store";
import { defaultPath } from "../shared/paths";

const LoginPage = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [localEmail, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    user: { email },
  } = useSelector((store: Store) => store);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(authorizeUser({ email: localEmail, password }));
    if (email === localEmail) {
      navigate(defaultPath);
    }
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>Вход</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput
          onChange={({ target: { value } }) =>
            handleInputChange(value, setLocalEmail)
          }
          extraClass={styles.inputEmail}
          value={localEmail}
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
