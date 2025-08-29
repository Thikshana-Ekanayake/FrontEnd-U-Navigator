import React, { createContext, useCallback, useEffect, useState } from "react";
import { saveToken, deleteToken, getToken } from "../storage/secureStore";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

export const AuthContext = createContext({
    isLoading: true,
    isAuthenticated: false,
    login: async (_email, _password) => {},
    logout: async () => {},
    profile: null,
});

export function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const fetchProfile = useCallback(async () => {
        try {
            const { data } = await api.get(endpoints.auth.me);
            setProfile(data);
        } catch {
            setProfile(null);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        // BACKEND contract: POST /api/auth/login -> { token: string }
        const { data } = await api.post(endpoints.auth.login, { email, password });
        if (data?.token) {
            await saveToken(data.token);
            await fetchProfile();
        } else {
            throw new Error("Invalid login response");
        }
    }, [fetchProfile]);

    const logout = useCallback(async () => {
        await deleteToken();
        setProfile(null);
    }, []);

    // On app start, try load token + profile
    useEffect(() => {
        (async () => {
            const token = await getToken();
            if (token) await fetchProfile();
            setIsLoading(false);
        })();
    }, [fetchProfile]);

    // Global 401 listener -> logout
    useEffect(() => {
        const onUnauthorized = () => logout();
        globalThis.addEventListener?.("auth:unauthorized", onUnauthorized);
        return () => globalThis.removeEventListener?.("auth:unauthorized", onUnauthorized);
    }, [logout]);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isAuthenticated: !!profile,
                login,
                logout,
                profile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
