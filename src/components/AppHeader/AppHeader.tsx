import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  defaultPath,
  feedPath,
  ordersPath,
  profilePath,
} from "../../shared/paths";
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
          <NavLink
            className={`${styles.link} ${
              activeNavLink !== defaultPath && styles.linkDisabled
            } ml-2 text text_type_main-default`}
            onClick={() => onClickHandler(defaultPath)}
            to={defaultPath}
          >
            <BurgerIcon type="primary" />
            Constructor
          </NavLink>
          <NavLink
            className={`${styles.link} ${
              activeNavLink !== ordersPath && styles.linkDisabled
            } ml-2 text text_type_main-default`}
            onClick={() => onClickHandler(ordersPath)}
            to={feedPath}
          >
            <ListIcon type="primary" />
            Feed
          </NavLink>
        </div>
        <NavLink className={styles.logo} to={defaultPath}>
          <Logo />
        </NavLink>
        <NavLink
          className={`${styles.link}   ${
            activeNavLink !== profilePath && styles.linkDisabled
          } ml-2 text text_type_main-default`}
          onClick={() => onClickHandler(ordersPath)}
          to={profilePath}
        >
          <ProfileIcon type="primary" />
          Profile
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
