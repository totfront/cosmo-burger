import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "../index.module.css";
import { FormEvent, useState } from "react";
import { addNewUser } from "../../services/userAuth";
import { handleInputChange } from "../../services/helpers";
import { useDispatch } from "../../shared/hooks";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addNewUser({ name, email, password }, navigate));
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={`${styles.heading} text text_type_main-medium`}>
        Sign up
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          extraClass={styles.inputName}
          onChange={({ target: { value } }) =>
            handleInputChange(value, setName)
          }
          name="name"
          value={name}
          placeholder="Name"
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
        />
        <PasswordInput
          extraClass={styles.inputPassword}
          onChange={({ target: { value } }) =>
            handleInputChange(value, setPassword)
          }
          value={password}
          name={password}
          placeholder="Password"
        />
        <Button
          extraClass={styles.submit}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Sign up
        </Button>
      </form>
      <p className={`text text_type_main-small ${styles.text}`}>
        Signed up already? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default SignInPage;
