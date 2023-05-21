import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { ThunkDispatch } from "redux-thunk";
import { ActionTypes } from "../../shared/types/Actions";

function App() {
  const dispatch: ThunkDispatch<Store, null, ActionTypes> = useDispatch();
  const { error } = useSelector((store: Store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <h2 className={`${styles.heading} text_type_main-large mt-10 mb-5`}>
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
