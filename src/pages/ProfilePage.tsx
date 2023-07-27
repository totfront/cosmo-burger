import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./common.module.css";
import { useEffect, useState } from "react";
import { handleInputChange } from "../services/helpers";
import { useSelector } from "react-redux";
import { Store } from "../shared/types/Store";
import { logoutUser } from "../services/actions/user";
import { useNavigate } from "react-router-dom";
import { loginPath } from "../shared/paths";

const profile = "profile";
const history = "history";
const exit = "exit";

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    name: currentName,
    email: currentEmail,
    password: currentPassword,
  } = useSelector((store: Store) => store.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("");

  useEffect(() => {
    setActiveNavItem(profile);
    setName(currentName);
    setEmail(currentEmail);
    setPassword(currentPassword);
  }, []);

  const navButtonClick = (func: () => void) => {
    func();
    // todo: on 4th sprint
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button
            className={`${styles.navButton} ${
              activeNavItem === profile && styles.navButtonActive
            }`}
            type="button"
            onClick={() => navButtonClick(() => {})}
          >
            Профиль
          </button>
        </li>
        <li className={styles.listItem}>
          <button
            className={`${styles.navButton} ${
              activeNavItem === history && styles.navButtonActive
            }`}
            type="button"
            onClick={() => navButtonClick(() => {})}
          >
            История заказов
          </button>
        </li>
        <li className={styles.listItem}>
          <button
            className={`${styles.navButton} ${
              activeNavItem === exit && styles.navButtonActive
            }`}
            type="button"
            onClick={() =>
              navButtonClick(() => {
                logoutUser();
                navigate(loginPath);
              })
            }
          >
            Выход
          </button>
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
            onChange={({ target: { value } }) =>
              handleInputChange(value, setEmail)
            }
            extraClass={styles.inputEmail}
            value={email}
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
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
