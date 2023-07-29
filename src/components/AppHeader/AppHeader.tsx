import {
  BurgerIcon,
  Button,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";
import { Link } from "react-router-dom";
import { defaultPath, ordersPath, profilePath } from "../../shared/paths";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_NAV_LINK } from "../../services/actions/header";

const AppHeader = () => {
  const dispatch = useDispatch();
  const onClickHandler = (path: string) => {
    dispatch({ type: SET_ACTIVE_NAV_LINK, activeLink: path });
  };

  return (
    <header className={`${styles.header} pt-4 pb-4 pr-5 pl-5`}>
      <nav className={styles.navBar}>
        <div className={styles.btnContainer}>
          <Button
            className={`${styles.button} pl-0 pr-5`}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <BurgerIcon type="primary" />
            <Link
              className={`${styles.link} ml-2 text text_type_main-default`}
              onClick={() => onClickHandler(defaultPath)}
              to={defaultPath}
            >
              Конструктор
            </Link>
          </Button>
          <Button
            className={`${styles.button} pl-5 pr-5`}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <BurgerIcon type="primary" />
            <Link
              className={`${styles.link} ${styles.linkDisabled} ml-2 text text_type_main-default`}
              onClick={() => onClickHandler(ordersPath)}
              to={ordersPath}
            >
              Лента заказов
            </Link>
          </Button>
        </div>
        <Logo />
        <Button
          className={`${styles.button} pl-5 pr-0`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          <BurgerIcon type="primary" />
          <Link
            className={`${styles.link} ${styles.linkDisabled} ml-2 text text_type_main-default`}
            onClick={() => onClickHandler(ordersPath)}
            to={profilePath}
          >
            Личный кабинет
          </Link>
        </Button>
      </nav>
    </header>
  );
};

export default AppHeader;
