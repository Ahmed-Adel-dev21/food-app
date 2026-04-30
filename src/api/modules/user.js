import api from '../axsiosClient'

export const getUsers = (params) => {
    return api.get("/Users",{params});
}
export const getUsersById = (id) => {
    return api.get(`/Users/${id}`);
}
export const createUsers = (data) => {
    return api.post("/Users",data);
}