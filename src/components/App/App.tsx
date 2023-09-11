import styles from "./App.module.css";
import { HashRouter } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import Router from "../Router/Router";
import { getUserData } from "../../services/userAuth";
import { useEffect } from "react";
import { getIngredients } from "../../redux/actions/ingredients";
import { useDispatch } from "../../shared/hooks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {/* unfortunately we can not use the router on the GitHup pages*/}
      {/* <BrowserRouter> */}
      <HashRouter>
        <AppHeader />
        <Router />
      </HashRouter>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
