// todo: cleanup import for css from a proper folder
import type { Identifier, XYCoord } from "dnd-core";
import { FC, useRef } from "react";
import { Ingredient } from "../../shared/types/Ingredient";
import styles from "./constructorIngredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";

type Props = {
  ingredient: Ingredient;
  onDelete: () => void;
  index: number;
  onDrop: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = Ingredient & {
  index: number;
};

const ConstructorIngredient: FC<Props> = ({
  ingredient,
  index,
  onDelete,
  onDrop,
}) => {
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

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Perform the action
      onDrop(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
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

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className={`${styles.ingredient} ${styles[type]}`}
    >
      {type !== "bun" && (
        <div className={styles.iconWrapper}>
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
