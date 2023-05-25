const PROD_BACKEND_API_URL = "https://am-o-vaca-face.mooo.com/api";
export const DEV_BACKEND_API_URL = "http://127.0.0.1:3000/api";

export const BACKEND_API_URL =
    process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;
