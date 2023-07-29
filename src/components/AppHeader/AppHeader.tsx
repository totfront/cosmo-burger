import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { defaultPath, ordersPath, profilePath } from "../../shared/paths";
import { useEffect, useState } from "react";

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const onClickHandler = (path: string) => {
    navigate(path);
  };
  const [activeNavLink, setActiveNavLink] = useState(pathname);

  useEffect(() => {
    setActiveNavLink(pathname);
  }, [pathname]);

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
            <NavLink
              className={`${styles.link} ${
                activeNavLink !== defaultPath && styles.linkDisabled
              } ml-2 text text_type_main-default`}
              onClick={() => onClickHandler(defaultPath)}
              to={defaultPath}
            >
              Конструктор
            </NavLink>
          </Button>
          <Button
            className={`${styles.button} pl-5 pr-5`}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            <ListIcon type="primary" />
            <NavLink
              className={`${styles.link} ${
                activeNavLink !== ordersPath && styles.linkDisabled
              } ml-2 text text_type_main-default`}
              onClick={() => onClickHandler(ordersPath)}
              to={ordersPath}
            >
              Лента заказов
            </NavLink>
          </Button>
        </div>
        <Logo />
        <Button
          className={`${styles.button} pl-5 pr-0`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          <ProfileIcon type="primary" />
          <NavLink
            className={`${styles.link}   ${
              activeNavLink !== profilePath && styles.linkDisabled
            } ml-2 text text_type_main-default`}
            onClick={() => onClickHandler(ordersPath)}
            to={profilePath}
          >
            Личный кабинет
          </NavLink>
        </Button>
      </nav>
    </header>
  );
};

export default AppHeader;
