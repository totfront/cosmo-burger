import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import RoutesContainer from "../RouterContainer/RouterContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/actions/userAuth";
import { State } from "../../shared/types/State";
import { useEffect } from "react";

function App() {
  const dispatch: any = useDispatch();
  const { _id } = useSelector(
    (state: State) => state.ingredientModal.selectedIngredient
  );

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <RoutesContainer selectedId={_id} />
      </BrowserRouter>
    </div>
  );
}

export default App;
