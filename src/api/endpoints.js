export const endpoints = {
    auth: {
        login: "/api/auth/login",            // adjust to your API route
        refresh: "/api/auth/refresh",        // if you implement refresh later
        me: "/api/auth/me",                  // profile
    },

    universities: {
        list: "/api/university"
    },

    degrees: {
        list: "/api/degree",                             // GET all degrees
    }

    // Add more domains here...
};
