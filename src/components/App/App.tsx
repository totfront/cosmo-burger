import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import RoutesContainer from "../RouterContainer/RouterContainer";
import { useDispatch } from "react-redux";
import { getUserData } from "../../services/actions/userAuth";
import { useEffect } from "react";

function App() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <RoutesContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
