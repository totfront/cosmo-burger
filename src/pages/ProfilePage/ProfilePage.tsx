import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../index.module.css";
import { useEffect, useState } from "react";
import { getCookie, handleInputChange } from "../../services/helpers";
import { logoutUser } from "../../services/userAuth";
import { Link, useLocation } from "react-router-dom";
import {
  loginPath,
  ordersPath,
  profilePath,
  wsNoMorePartiesOrdersUrl,
} from "../../shared/paths";
import { Order } from "../../components/Order/Order";
import {
  ORDERS_HISTORY_WS_CLOSED,
  ORDERS_HISTORY_WS_INIT,
} from "../../redux/actions/ordersHistory";
import { WsStatus } from "../../shared/types/WebSocket/WsStatus";
import { accessToken } from "../../shared/names";
import { useDispatch, useSelector } from "../../shared/hooks";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const {
    name: currentName,
    email: currentEmail,
    password: currentPassword,
  } = useSelector((store) => store.user);
  const { orders } = useSelector((state) => state.ordersHistory);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const token = getCookie(accessToken);

  useEffect(() => {
    setName(currentName);
    setEmail(currentEmail);
    setPassword(currentPassword);
  }, [currentEmail, currentName, currentPassword]);

  useEffect(() => {
    dispatch({
      type: ORDERS_HISTORY_WS_INIT,
      payload: `${wsNoMorePartiesOrdersUrl}?token=${token?.replace(
        "Bearer ",
        ""
      )}`,
    });
    return () => {
      dispatch({ type: ORDERS_HISTORY_WS_CLOSED, payload: WsStatus.CLOSED });
    };
  }, [dispatch, token]);

  return (
    <div className={styles.container}>
      <section className={styles.navWrapper}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link
              to={`${profilePath}`}
              className={`${styles.navLink} ${
                pathname === profilePath && styles.navLinkActive
              } text text_type_main-default`}
              type="button"
            >
              Профиль
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              to={`${profilePath}${ordersPath}`}
              className={`${styles.navLink} ${
                pathname !== profilePath && styles.navLinkActive
              } text text_type_main-default`}
              type="button"
            >
              История заказов
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              to={loginPath}
              className={`${styles.navLink} text text_type_main-default`}
              type="button"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              Выход
            </Link>
          </li>
        </ul>
        <p className={`text text_type_main-small ${styles.description}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      {pathname === profilePath ? (
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
      ) : (
        <ul className={`${styles.feed}`}>
          {orders
            ? orders.map((order, i) => (
                <Order withStatus {...order} key={order._id} />
              ))
            : "🤔"}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
