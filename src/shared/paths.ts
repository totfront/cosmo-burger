export const defaultPath = "/";
export const resetPasswordPath = "/reset-password";
export const forgotPasswordPath = "/forgot-password";
export const loginPath = "/login";
export const signinPath = "/signin";
export const profilePath = "/profile";
export const ingredientsPath = "/ingredients";
export const feedPath = "/feed";
export const ordersPath = "/orders";
export const noMorePartiesApiUrl = `https://norma.nomoreparties.space/api`;
export const wsNoMorePartiesOrdersUrl =
  `wss://norma.nomoreparties.space${ordersPath}` as const;
