import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructort";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h2 className={`${styles.heading} text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h2>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
