import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./constructorPage.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";

const ConstructorPage = () => {
  const { error } = useSelector((store: Store) => store.ingredients);

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
