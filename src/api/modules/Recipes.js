import api from '../axsiosClient'

export const getAllRecipe = () => {
    return api.get("/Recipe");
}

export const createRecipe = (data) => {
    return api.post("/Recipe", data); 
}

export const updateRecipeById = (id,data) => {
    return api.put(`/Recipe/${id}`,data);
}

export const  getRecipeById = (id) => {
    return api.get(`/Recipe/${id}`);
}

export const deleteRecipeById = (id) => {
    
    return api.delete(`/Recipe/${id}`);
}
