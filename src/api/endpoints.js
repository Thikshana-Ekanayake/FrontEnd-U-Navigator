export const endpoints = {
    auth: {
        login: "/api/auth/login",            // adjust to your API route
        refresh: "/api/auth/refresh",        // if you implement refresh later
        me: "/api/auth/me",                  // profile
    },

    universities: {
        list: "/api/university",
        degreesWithCount: (id) => `/api/university/${id}/degreeswithcount`,
        degreesByUniversity: (id) => `/api/university/${id}/degrees`,
        byId: (id) => `/api/university/${id}`,

    },

    degrees: {
        list: "/api/degree",                             // GET all degrees
        byId: (id) => `/api/degree/${id}`,
        activity: (id) => `/api/degree/${id}/activity`,

    },

    criteria: {
        byDegreeId: (degreeId) => `/api/criteria/by-degree-id/${degreeId}`,
    },

    studentResults: {
        byStudent: (studentId) => `/api/studentSubjectResult/by-student/${studentId}`,
    },

    // Add more domains here...
};
