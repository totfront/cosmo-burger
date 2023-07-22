import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./common.module.css";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { registerUser } from "../../services/apis/authorizationApi";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleInputChange = (
    value: string,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    setter(value);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUser({ name, email, password });
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Регистрация
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          extraClass={styles.inputName}
          onChange={({ target: { value } }) =>
            handleInputChange(value, setName)
          }
          name="name"
          value={name}
          placeholder="Имя"
        />
        <EmailInput
          onChange={({ target: { value } }) =>
            handleInputChange(value, setEmail)
          }
          extraClass={styles.inputEmail}
          value={email}
          name={email}
          isIcon={false}
          placeholder="E-mail"
        ></EmailInput>
        <PasswordInput
          extraClass={styles.inputPassword}
          onChange={({ target: { value } }) =>
            handleInputChange(value, setPassword)
          }
          value={password}
          name={password}
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
};

export default SignInPage;
