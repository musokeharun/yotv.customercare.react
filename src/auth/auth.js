import jwt_decode from "jwt-decode";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const getTokenData = () => jwt_decode(getToken());
