import { Dispatch, SetStateAction } from "react";
import { Ingredient } from "../shared/types/Ingredient";
import { SortedIngredients } from "../shared/types/SortedIngredients";

const getTimeStamp = (lastEdit: string): string => {
  // Convert the input date string to a Date object
  const inputDateObj: Date = new Date(lastEdit);

  // Get the current date
  const currentDate: Date = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference: number = currentDate.getTime() - inputDateObj.getTime();

  // Calculate the number of days
  const daysDifference: number = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24)
  );

  // Get the time in "HH:MM" format
  const hours = inputDateObj.getHours().toString().padStart(2, "0");
  const minutes = inputDateObj.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  if (daysDifference === 0) {
    return `Сегодня, ${timeString}`;
  } else if (daysDifference === 1) {
    return `Вчера, ${timeString}`;
  } else {
    return `${daysDifference} ${
      daysDifference < 5 ? "дня" : "дней"
    } назад, ${timeString}`;
  }
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

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const handleInputChange = (
  value: string,
  setter: Dispatch<SetStateAction<string>>
) => {
  setter(value);
};

const getIdFromPath = (path: string) => {
  // Split the path string by "/"
  const parts: string[] = path.split("/");
  // Get the last part of the path (after the last "/")
  const lastPart: string = parts[parts.length - 1];
  return lastPart;
};

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

const setCookie = (
  name: string,
  value: string,
  options?: Record<string, unknown>
): void => {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = name + "=" + value;

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export {
  setCookie,
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
