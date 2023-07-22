import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { Dispatch, SetStateAction, useState } from "react";

const ProfilePage = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleInputChange = (
    value: string,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    setter(value);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Button htmlType="button" type="secondary" size="large">
            Профиль
          </Button>
        </li>
        <li className={styles.listItem}>
          <Button htmlType="button" type="secondary" size="large">
            История заказов
          </Button>
        </li>
        <li className={styles.listItem}>
          <Button htmlType="button" type="secondary" size="large">
            Выход
          </Button>
        </li>
      </ul>
      <p className={`text text_type_main-small ${styles.description}`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <div className={styles.wrapper}>
        <form className={styles.form}>
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
            onChange={() => {}}
            extraClass={styles.inputEmail}
            value={"dynamicValue"}
            name={"email"}
            isIcon={false}
            placeholder="E-mail"
          />
          <PasswordInput
            extraClass={styles.inputPassword}
            onChange={() => {}}
            value={"dynamicValue"}
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
      </div>
    </div>
  );
};

export default ProfilePage;
