// todo: cleanup import for css from a propper folder
import type { Identifier, XYCoord } from "dnd-core";
import { FC, useRef } from "react";
import { Ingredient } from "../../shared/types/Ingredient";
import styles from "../BurgerConstructor/burgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

type Props = {
  ingredient: Ingredient;
  onDelete: () => void;
  index: number;
};

type DragItem = Ingredient & {
  index: number;
};

const ConstructorIngredient: FC<Props> = ({ ingredient, index, onDelete }) => {
  const { image, price, name, type } = ingredient;
  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "constructorIngredient",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      console.log({ dragIndex, hoverIndex });
      //   moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { ...ingredient, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // todo: optional improvement
  // const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li ref={ref} className={`${styles.ingredient} ${styles[type]}`}>
      {type !== "bun" && (
        <div style={{ flexShrink: 0 }}>
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
        extraClass="ml-2"
        text={name}
        price={price}
        thumbnail={image}
        isLocked={type === "bun"}
        handleClose={() => onDelete()}
      />
    </li>
  );
};

export default ConstructorIngredient;
