import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderDetails.module.css";
import testImage from "../../images/bun-02.svg";

export const OrderDetails = () => (
  <section className={`${styles.wrapper}`}>
    <p className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
      #034533
    </p>
    <h3 className={`text text_type_main-medium mb-3`}>
      Black Hole Singularity острый бургер
    </h3>
    <p className={`${styles.status} text text_type_main-default mb-15`}>
      Выполнен
    </p>
    <h3 className={`text text_type_main-medium mb-6`}>Состав:</h3>
    <ul className={`${styles.ingredients} mb-10 mr-6`}>
      <li className={`${styles.ingredient}`}>
        <div className={`${styles.ingredientImageWrapper}`}>
          <img
            className={`${styles.ingredientImage}`}
            src={testImage}
            alt="ingredient"
          />
        </div>
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          Флюоресцентная булка R2-D3
        </span>
        <div className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>1 x 80</span>
          <CurrencyIcon type="primary" />
        </div>
      </li>
      <li className={`${styles.ingredient}`}>
        <div className={`${styles.ingredientImageWrapper}`}>
          <img
            className={`${styles.ingredientImage}`}
            src={testImage}
            alt="ingredient"
          />
        </div>
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          Флюоресцентная булка R2-D3
        </span>
        <div className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>1 x 80</span>
          <CurrencyIcon type="primary" />
        </div>
      </li>{" "}
      <li className={`${styles.ingredient}`}>
        <div className={`${styles.ingredientImageWrapper}`}>
          <img
            className={`${styles.ingredientImage}`}
            src={testImage}
            alt="ingredient"
          />
        </div>
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          Флюоресцентная булка R2-D3
        </span>
        <div className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>1 x 80</span>
          <CurrencyIcon type="primary" />
        </div>
      </li>{" "}
      <li className={`${styles.ingredient}`}>
        <div className={`${styles.ingredientImageWrapper}`}>
          <img
            className={`${styles.ingredientImage}`}
            src={testImage}
            alt="ingredient"
          />
        </div>
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          Флюоресцентная булка R2-D3
        </span>
        <div className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>1 x 80</span>
          <CurrencyIcon type="primary" />
        </div>
      </li>
      <li className={`${styles.ingredient}`}>
        <div className={`${styles.ingredientImageWrapper}`}>
          <img
            className={`${styles.ingredientImage}`}
            src={testImage}
            alt="ingredient"
          />
        </div>
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          Филе Люминесцентного тетраодонтимформа
        </span>
        <div className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>1 x 80</span>
          <CurrencyIcon type="primary" />
        </div>
      </li>
      <li className={`${styles.ingredient}`}>
        <img
          className={`${styles.ingredientImage}`}
          src={testImage}
          alt="ingredient"
        />
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          Соус традиционный галактический
        </span>
        <div className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>1 x 80</span>
          <CurrencyIcon type="primary" />
        </div>
      </li>
      <li className={`${styles.ingredient}`}>
        <img
          className={`${styles.ingredientImage}`}
          src={testImage}
          alt="ingredient"
        />
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          Плоды фалленианского дерева
        </span>
        <div className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>1 x 80</span>
          <CurrencyIcon type="primary" />
        </div>
      </li>
    </ul>
    <p className={styles.footer}>
      <span className={`text text_type_main-default text_color_inactive`}>
        Вчера, 13:50
      </span>
      <div className={styles.priceWrapper}>
        <span className={`text text_type_digits-default mr-2`}>510</span>
        <CurrencyIcon type="primary" />
      </div>
    </p>
  </section>
);
