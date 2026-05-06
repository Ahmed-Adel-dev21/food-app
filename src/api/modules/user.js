import api from '../axsiosClient'

export const getUsers = () => {
    return api.get("/Users");
}
export const getUsersById = (id) => {
    return api.get(`/Users/${id}`);
}
export const deleteUsersById = (id) => {
    return api.delete(`/Users/${id}`);
}
export const createUsers = (data) => {
    return api.post("/Users",data);
}