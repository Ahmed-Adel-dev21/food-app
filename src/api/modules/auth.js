import api from "../axsiosClient";

export const Loginnn = (data) => {
  return api.post("/Users/Login", data);
};

export const Registerrr = (data) => {
  return api.post("/Users/Register", data);
};

export const ForgetPassss = (data) => {
  return api.post("/Users/Reset/Request", data);
};

export const Reset = (data) => {
  return api.post("/Users/Reset", data);
};
export const Verify = (data) => {
  return api.put("/Users/verify", data);
};
export const changePassword = (data) => {
  return api.put("/Users/ChangePassword", data);
};
