import { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { fetchData } from "../../utils/burgerApi";
import { checkResponse, getErrorMessage } from "../../utils/helpers";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData()
      .then((res) => checkResponse(res))
      .then(({ data }) => setIngredients(data))
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
        console.error(errorMessage);
      });
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
