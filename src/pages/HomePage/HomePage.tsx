import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./homePage.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const { error } = useSelector((store: State) => store.ingredients);
  const { pathname } = location;
  const isOrders = pathname === "/orders";

  return (
    <main className={`${styles.main} mt-10 mb-10`}>
      <h2 className={`${styles.heading} text_type_main-large mb-5`}>
        {isOrders ? "Лента заказов" : "Соберите бургер"}
      </h2>
      {!error && !isOrders ? (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      ) : (
        <p className={`text text_type_main-small ${styles.text}`}>
          Something went wrong, try to reload 😐
        </p>
      )}
    </main>
  );
};

export default HomePage;
