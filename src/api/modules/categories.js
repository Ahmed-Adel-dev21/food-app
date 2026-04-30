
import api from '../axsiosClient'

export const getCategories = () => {
    return api.get("/Category");
}

export const createCategories = (data) => {
    
    return api.post("/Category", data); 
}

export const getCategoriesById = (id) => {
    return api.get(`/Category/${id}`);
}

export const deleteCategoriesById = (id) => {
    
    return api.delete(`/Category/${id}`);
}
