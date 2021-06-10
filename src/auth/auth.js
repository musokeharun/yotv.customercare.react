import jwt_decode from "jwt-decode";

export const getToken = () => sessionStorage.getItem("token");
export const setToken = (token) => sessionStorage.setItem("token", token);
export const getTokenData = () => jwt_decode(getToken());
