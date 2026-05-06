import api from '../axsiosClient'

export const getAllTags = () => {
    return api.get("/tag");
}