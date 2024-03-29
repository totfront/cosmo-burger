import styles from "./confirmation.module.css";
import doneImage from "../../images/done.svg";
import { useSelector } from "../../shared/hooks";

const Confirmation = () => {
  const { id, name, isRequest } = useSelector(
    (store) => store.orderConfirmationModal
  );

  return (
    <div className={styles.inner}>
      {isRequest ? (
        <p
          className={`${styles.textBlock} text text_type_main-default text_color_inactive`}
        >
          Wait for confirmation ⏳ (~15 sek)
        </p>
      ) : (
        <>
          <h2 className="text text_type_digits-large mt-20">{id}</h2>
          <h3 className={`${styles.heading} mt-8 text text_type_main-medium`}>
            {name}
          </h3>
          <img src={doneImage} className={"mt-15"} alt="Done" loading="lazy" />
          <p
            className={`${styles.textBlock} mt-15 text text_type_main-default`}
          >
            Your order is in progress
          </p>
          <p
            className={`${styles.textBlock} mt-4 text text_type_main-default text_color_inactive`}
          >
            Await at the orbital station
          </p>
        </>
      )}
    </div>
  );
};

export default Confirmation;
