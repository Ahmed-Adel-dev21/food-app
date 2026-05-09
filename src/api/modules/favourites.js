import api from "../axsiosClient";

export const getAllFav = () => {
  return api.get("/userRecipe");
};

export const createFav = (data) => {
  return api.post("/userRecipe", data);
};

export const deleteFavById = (id) => {
  return api.delete(`/userRecipe/${id}`);
};
