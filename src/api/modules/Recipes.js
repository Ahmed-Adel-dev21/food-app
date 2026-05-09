import api from "../axsiosClient";

export const getAllRecipe = (name, tagId, categoryId, pageSize, pageNumber) => {
  return api.get("/Recipe", {
    params: { name, tagId, categoryId, pageSize, pageNumber },
  });
};

export const createRecipe = (data) => {
  return api.post("/Recipe", data);
};

export const updateRecipeById = (id, data) => {
  return api.put(`/Recipe/${id}`, data);
};

export const getRecipeById = (id) => {
  return api.get(`/Recipe/${id}`);
};

export const deleteRecipeById = (id) => {
  return api.delete(`/Recipe/${id}`);
};
