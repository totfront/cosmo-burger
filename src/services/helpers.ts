import { Dispatch, SetStateAction } from "react";
import { Ingredient } from "../shared/types/Ingredient";
import { SortedIngredients } from "../shared/types/SortedIngredients";
import { ingredientsPath } from "../shared/paths";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday, isYesterday);

const getTimeStamp = (lastEdit: string): string => {
  let day;
  const editedToday = dayjs().isToday();
  const editedYesterday = dayjs(lastEdit).isYesterday();

  if (editedToday) {
    return (day = "Сегодня");
  }
  if (editedYesterday) {
    return (day = "Вчера");
  }
  // Convert the provided time format to a Date object
  const providedDate = new Date(lastEdit);
  // Get the current date as a Date object
  const currentDate = new Date();
  // Calculate the time difference in milliseconds
  const timeDifference: number = providedDate.getTime() - currentDate.getTime();
  // Convert the time difference to days
  const daysBefore = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  // todo: care about 11-14, 21-24, etc days spelling
  return (day = `${daysBefore} ${daysBefore < 5 ? "дня" : "дней"} назад`);
};

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

const searchMenuItems = (
  searchStrings: string | string[],
  database: (Ingredient & { counter?: number })[]
) => {
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

const getCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];

const handleInputChange = (
  value: string,
  setter: Dispatch<SetStateAction<string>>
) => {
  setter(value);
};

const getIdFromPath = (path: string) =>
  path.substring(ingredientsPath.length + 1, path.length);

const getAllIngredients = (
  sortedIngredients: SortedIngredients
): Ingredient[] => {
  return Object.values(sortedIngredients)
    .flatMap((category) =>
      category.count ? Array(category.count).fill(category) : category
    )
    .flat();
};

const getTotalPrice = (
  ingredients: Ingredient[],
  ingredientIds: string[]
): number => {
  return ingredients
    .filter((ingredient) => ingredientIds.includes(ingredient._id))
    .reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
};

const categorizeIds = (
  ids: string[]
): { uniqIds?: string[]; repeatedIds?: { id: string; count: number }[] } => {
  const idCountMap: { [id: string]: number } = {};

  ids.forEach((id) => {
    idCountMap[id] = (idCountMap[id] || 0) + 1;
  });

  const uniqIds = Object.keys(idCountMap).filter((id) => idCountMap[id] === 1);

  const repeatedIds = Object.keys(idCountMap)
    .filter((id) => idCountMap[id] > 1)
    .map((id) => ({ id, count: idCountMap[id] }));

  return {
    uniqIds: uniqIds.length > 0 ? uniqIds : undefined,
    repeatedIds: repeatedIds.length > 0 ? repeatedIds : undefined,
  };
};

export {
  getTimeStamp,
  categorizeIds,
  getTotalPrice,
  getAllIngredients,
  getIdFromPath,
  handleInputChange,
  searchMenuItems,
  tabNameConverter,
  sortIngredients,
  checkResponse,
  getCookie,
};
