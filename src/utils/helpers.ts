import dataBase from "./data.json";

const searchMenuItems = (
  searchStrings: string | string[],
  database = dataBase
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

export { searchMenuItems };
