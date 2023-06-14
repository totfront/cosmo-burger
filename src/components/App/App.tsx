import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { Store } from "../../shared/types/Store";
import { useSelector } from "react-redux";

function App() {
  const { error } = useSelector((store: Store) => store.ingredients);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} mt-10 mb-10`}>
        <h2 className={`${styles.heading} text_type_main-large mb-5`}>
          Соберите бургер
        </h2>
        {!error ? (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        ) : (
          <>'Что-то пошло не так, перезагрузите страницу</>
        )}
      </main>
    </div>
  );
}

export default App;
