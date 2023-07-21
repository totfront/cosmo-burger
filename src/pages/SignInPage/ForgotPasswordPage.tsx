import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => (
  <main className={styles.wrapper}>
    <h2 className={`${styles.heading} text text_type_main-medium`}>
      Восстановление пароля
    </h2>
    <form className={styles.form}>
      <EmailInput
        onChange={() => {}}
        extraClass={styles.inputEmail}
        value={""}
        name={"email"}
        isIcon={false}
        placeholder="Укажите e-mail"
      ></EmailInput>
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

export default ForgotPasswordPage;
