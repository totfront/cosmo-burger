import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { checkEmail } from "../../services/apis/authorizationApi";
import { resetPasswordPath } from "../../shared/paths";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleChange = (value: string) => {
    setEmail(value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        Remind password
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          onChange={(e) => handleChange(e.target.value)}
          extraClass={styles.inputEmail}
          value={email}
          name={"email"}
          isIcon={false}
          placeholder="E-mail"
        />
        <Button
          extraClass={styles.submit}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Remind
        </Button>
      </form>
      <p className={`text text_type_main-small ${styles.text}`}>
        Remembered the password?
        <Link className={styles.link} to="/login">
          Log in
        </Link>
      </p>
    </main>
  );
};

export default ForgotPasswordPage;
