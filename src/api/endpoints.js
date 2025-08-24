export const endpoints = {
    auth: {
        login: "/api/auth/login",            // adjust to your API route
        refresh: "/api/auth/refresh",        // if you implement refresh later
        me: "/api/auth/me",                  // profile
    },
    // Example: community
    posts: {
        list: "/api/posts",
        byId: (id) => `/api/posts/${id}`,
    },
    // Add more domains here...
};
