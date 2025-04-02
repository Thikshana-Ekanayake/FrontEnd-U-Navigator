import React from "react";
import StudentProfile from "../screens/profile/student/StudentProfile";

const Profile = () => {
    // Profile Data Array
    const profiles = [
        {
            id: "P1",
            name: "Iruka Pathirana",
            role: "School Student | Physical Science Stream",
            coverImage: "https://img.freepik.com/free-photo/top-view-eyeglasses-with-case_23-2148290434.jpg",
            profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
        },
    ];

    // Extract the first profile
    const profile = profiles[0];

    return <StudentProfile profile={profile} />;
};

export default Profile;
