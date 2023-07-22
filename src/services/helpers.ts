import { Ingredient } from "../shared/types/Ingredient";
import { SortedIngredients } from "../shared/types/SortedIngredients";

const tabNameConverter = (name: string) => {
  if (name === "Булки") return "buns";
  if (name === "Соусы") return "souses";
  return "inners";
};

const sortIngredients = (
  database: Ingredient[] & { counter?: number }
): SortedIngredients => {
  const result: SortedIngredients = {
    buns: [],
    sauces: [],
    inners: [],
  };

  for (let i = 0; i < database.length; i++) {
    const itemName: string = database[i].name;
    if (itemName.includes("булка")) {
      result.buns.push(database[i]);
    } else if (itemName.includes("Соус")) {
      result.sauces.push(database[i]);
    } else {
      result.inners.push(database[i]);
    }
  }

  return result;
};

const searchMenuItems = (searchStrings: string | string[], database: any[]) => {
  if (searchStrings === "Булки") searchStrings = "булка";
  if (searchStrings === "Соусы") searchStrings = "Соус";
  if (typeof searchStrings === "string") {
    searchStrings = [searchStrings];
  }

  const result = [];
  for (let i = 0; i < database.length; i++) {
    for (let j = 0; j < searchStrings.length; j++) {
      if (database[i].name.includes(searchStrings[j])) {
        result.push(database[i]);
        break;
      }
    }
  }

  if (result.length === 0) {
    for (let i = 0; i < database.length; i++) {
      if (
        !database[i].name.includes("булка") &&
        !database[i].name.includes("Соус")
      ) {
        result.push(database[i]);
      }
    }
  }

  return result;
};

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

export { searchMenuItems, tabNameConverter, sortIngredients, checkResponse };
