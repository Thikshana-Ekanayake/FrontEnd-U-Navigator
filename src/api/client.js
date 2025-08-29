import axios from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "../config";
import { getToken, deleteToken } from "../storage/secureStore";

/**
 * @typedef {Object} ApiError
 * @property {number} status
 * @property {any} data
 */

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT_MS,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Attach JWT on every request if present
api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 globally (logout, route to login)
let isHandling401 = false;
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const status = error?.response?.status;
        if (status === 401 && !isHandling401) {
            // token invalid/expired — clean up and broadcast
            isHandling401 = true;
            await deleteToken();
            // Consumers (AuthProvider) can listen to this event to navigate
            globalThis.dispatchEvent?.(new Event("auth:unauthorized"));
            isHandling401 = false;
        }
        return Promise.reject(error);
    }
);
