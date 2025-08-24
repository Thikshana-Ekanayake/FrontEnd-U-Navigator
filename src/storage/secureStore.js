import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "u-nav.jwt";

export async function saveToken(token) {
    if (!token) return;
    await SecureStore.setItemAsync(TOKEN_KEY, token, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK, // iOS
    });
}

export async function getToken() {
    try {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch {
        return null;
    }
}

export async function deleteToken() {
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch {}
}
