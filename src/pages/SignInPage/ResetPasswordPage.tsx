import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => (
  <main className={styles.wrapper}>
    <h2 className={`${styles.heading} text text_type_main-medium`}>
      Восстановление пароля
    </h2>
    <form className={styles.form}>
      <PasswordInput
        extraClass={styles.inputPassword}
        onChange={() => {}}
        value={"dynamicValue"}
        name={"email"}
        placeholder="Введите новый пароль"
      ></PasswordInput>{" "}
      <Input
        extraClass={styles.inputName}
        onChange={() => {}}
        name="name"
        value=""
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

export default ResetPasswordPage;
