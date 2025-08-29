import React from "react";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { AppState } from "react-native";

const queryClient = new QueryClient();

// Pause/resume queries when app background/foreground changes
focusManager.setEventListener((handleFocus) => {
    const subscription = AppState.addEventListener("change", (state) => {
        if (state === "active") handleFocus();
    });
    return () => subscription.remove();
});

export function QueryProvider({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
