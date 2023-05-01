import {
  BurgerIcon,
  Button,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";

const AppHeader = () => (
  <header className={`${styles.header} pt-4 pb-4`}>
    <nav className={styles.navBar}>
      <div className={styles.btnContainer}>
        <Button
          className={`${styles.button} pl-0 pr-5`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          <BurgerIcon type="primary" />
          <a
            className={`${styles.link} ml-2 text text_type_main-default`}
            href={"http://localhost:3000/"}
          >
            Конструктор
          </a>
        </Button>
        <Button
          className={`${styles.button} pl-5 pr-5`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          <BurgerIcon type="primary" />
          <a
            className={`${styles.link} ${styles.linkDisabled} ml-2 text text_type_main-default`}
            href={"http://localhost:3000/"}
          >
            Лента заказов
          </a>
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
        <a
          className={`${styles.link} ${styles.linkDisabled} ml-2 text text_type_main-default`}
          href={"http://localhost:3000/"}
        >
          Личный кабинет
        </a>
      </Button>
    </nav>
  </header>
);

export default AppHeader;
