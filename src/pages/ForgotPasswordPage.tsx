import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { checkEmail } from "../services/apis/authorizationApi";
import { resetPasswordPath } from "../shared/paths";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleChange = (value: string) => {
    setEmail(value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      checkEmail(email);
      navigate(resetPasswordPath);
    } catch (err) {
      console.error("едрить, вы сударь", { err });
    }
  };
  return (
    <main className={styles.wrapper}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          onChange={(e) => handleChange(e.target.value)}
          extraClass={styles.inputEmail}
          value={email}
          name={"email"}
          isIcon={false}
          placeholder="Укажите e-mail"
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

export default ForgotPasswordPage;
