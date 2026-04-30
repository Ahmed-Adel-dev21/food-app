import api from '../axsiosClient'

export const Login=(data)=>{
    return api.post("/Users/Login", data);
}

export const Register=(data)=>{
    return api.post("/Users/Register", data);
}

export const ForgetPass=(data)=>{
    return api.post("/Users/Reset/Request", data);
}

export const Reset=(data)=>{
    return api.post("/Users/Reset", data);
}
export const Verify=(data)=>{
    return api.put("/Users/verify", data);
}