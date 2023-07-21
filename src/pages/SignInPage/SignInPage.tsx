import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./common.module.css";

const SignInPage = () => (
  <main className={styles.wrapper}>
    <h2 className={`${styles.heading} text text_type_main-medium`}>
      Регистрация
    </h2>
    <form className={styles.form}>
      <Input
        extraClass={styles.inputName}
        onChange={() => {}}
        name="name"
        value="name"
        placeholder="Имя"
      />
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
        Зарегистрироваться
      </Button>
    </form>
    <p className={`text text_type_main-small ${styles.text}`}>
      Уже зарегистрированы? <Link to="/login">Войти</Link>
    </p>
  </main>
);

export default SignInPage;
