import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./constructorPage.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { useEffect } from "react";
import { getUserData } from "../../services/actions/user";
import { useNavigate } from "react-router-dom";
import { loginPath } from "../../shared/paths";

const ConstructorPage = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { error } = useSelector((store: Store) => store.ingredients);
  const { name } = useSelector((store: Store) => store.user);

  // useEffect(() => {
  //   dispatch(getUserData());
  // }, [dispatch]);
  // if (!name) navigate(loginPath);

  return (
    <main className={`${styles.main} mt-10 mb-10`}>
      <h2 className={`${styles.heading} text_type_main-large mb-5`}>
        Соберите бургер
      </h2>
      {!error ? (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      ) : (
        <>'Что-то пошло не так, перезагрузите страницу</>
      )}
    </main>
  );
};

export default ConstructorPage;
