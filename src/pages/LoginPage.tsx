import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => (
  <main className={styles.wrapper}>
    <h2 className={`${styles.heading} text text_type_main-medium`}>Вход</h2>
    <form className={styles.form}>
      <EmailInput
        onChange={() => {}}
        extraClass={styles.inputEmail}
        value={"dynamicValue"}
        name={"email"}
        isIcon={false}
        placeholder="E-mail"
      ></EmailInput>
      <PasswordInput
        extraClass={styles.inputPassword}
        onChange={() => {}}
        value={"dynamicValue"}
        name={"email"}
        placeholder="Пароль"
      ></PasswordInput>
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

export default LoginPage;
