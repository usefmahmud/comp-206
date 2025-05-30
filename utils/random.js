// id -> number
// token -> string
export const getRandomId = () => {
  return Date.now();
};

export const getRandomToken = () => {
  return Math.random().toString(36).substring(2);
};
