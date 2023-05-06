const tabNameConverter = (name: string) => {
  if (name === "Булки") return "buns";
  if (name === "Соусы") return "souses";
  return "inners";
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

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const checkResponse = (res: any) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

export { searchMenuItems, getErrorMessage, tabNameConverter, checkResponse };
