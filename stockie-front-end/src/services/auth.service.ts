import axios from "axios";
import { BACKEND_API_URL } from "../constants";


export const register = (username: string, password: string) => {
    return axios.post(`${BACKEND_API_URL}/register`, {
        username,
        password,
    });
};

export const login = (username: string, password: string) => {
    return axios
        .post(`${BACKEND_API_URL}/login`, {
            username,
            password,
        })
        .then((response) => {
            if (response.data) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", response.data.username);
                localStorage.setItem("user_id", response.data.user_id);
                localStorage.setItem("role", response.data.role);
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    return axios
        .delete(`${BACKEND_API_URL}/logout`);
};

export const getCurrentUserToken = () => {
    const tokenStr = localStorage.getItem("token");
    if (tokenStr)
        return tokenStr;

    return null;
};

export const getCurrentUserRole = () => {
    const roleStr = localStorage.getItem("role");
    if (roleStr)
        return roleStr;

    return undefined;
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr)
        return userStr;

    return undefined;
};

export const getCurrentUserId = () => {
    const userIdStr = localStorage.getItem("user_id");
    if (userIdStr)
        return userIdStr;

    return undefined;
};
