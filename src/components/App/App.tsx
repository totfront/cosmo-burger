import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import Router from "../Router/Router";
import { useDispatch } from "react-redux";
import { getUserData } from "../../services/userAuth";
import { useEffect } from "react";
import { getIngredients } from "../../redux/actions/ingredients";
import { AppDispatch } from "../../redux/middlewares/socketMiddleware";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
