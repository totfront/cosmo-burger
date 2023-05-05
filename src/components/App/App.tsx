import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(ingredientsUrl);
      const jsonData = await response.json();
      setIngredients(jsonData.data);
    };

    try {
      fetchData();
    } catch (err) {
      const getErrorMessage = (error: unknown) => {
        if (error instanceof Error) return error.message;
        return String(error);
      };
      setError(getErrorMessage(err));
    }
  }, []);

  return (
    <div className={styles.app}>
      {error ? (
        <>'Что-то пошло не так, перезагрузите страницу'</>
      ) : (
        <>
          <AppHeader />
          <main className={styles.main}>
            <h2 className={`${styles.heading} text_type_main-large mt-10 mb-5`}>
              Соберите бургер
            </h2>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
