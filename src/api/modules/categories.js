
import api from '../axsiosClient'

export const getAllCategories = () => {
    return api.get("/Category");
}

export const createCategories = (data) => {
    return api.post("/Category", data); 
}

export const getCategoriesById = (id) => {
    return api.get(`/Category/${id}`);
}
export const updateCategoriesById = (id,data) => {
    return api.put(`/Category/${id}`,data);
}

export const deleteCategoriesById = (id) => {
    
    return api.delete(`/Category/${id}`);
}
