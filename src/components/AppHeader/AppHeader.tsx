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
          <span className={`ml-2`}>Конструктор</span>
        </Button>
        <Button
          className={`${styles.button} pl-5 pr-5`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          <BurgerIcon type="primary" />
          <span className={`ml-2`}>Лента заказов</span>
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
        <span className={`ml-2`}>Личный кабинет</span>
      </Button>
    </nav>
  </header>
);

export default AppHeader;
