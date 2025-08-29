import { Platform } from "react-native";

// Use Expo public env at build time
const fromEnv = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

// Derive a sensible default when running locally
function deriveLocalDefault() {
    // Android emulator can't hit "localhost" of your PC. Use 10.0.2.2.
    if (Platform.OS === "android") return "http://10.0.2.2:5082";
    // iOS simulator + web can use localhost
    return "http://localhost:5082";
}

// export const API_BASE_URL = fromEnv || deriveLocalDefault();
export const API_BASE_URL = fromEnv;

// Good place for common headers, timeouts, etc.
export const API_TIMEOUT_MS = 20000;
