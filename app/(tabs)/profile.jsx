import React from "react";
import StudentProfile from "../screens/profile/student/StudentProfile";
import ConsultantProfile from "../screens/profile/consultant/ConsultantProfile";

const Profile = () => {
    // Profile Data Array
    const profiles = [
        {
            id: "P1",
            name: "Esther Howard",
            role: "Senior Lecturer | Faculty of Information Technology",
            university: "University of Moratuwa",
            coverImage: "https://plus.unsplash.com/premium_photo-1673177667569-e3321a8d8256?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
            profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
            type: "consultant",
        },
        {
            id: "P1",
            name: "Thikshana Ekanayake",
            role: "School Student | Physical Science Stream",
            coverImage: "https://img.freepik.com/free-photo/top-view-eyeglasses-with-case_23-2148290434.jpg",
            profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
            type: "student",
        },

    ];

    const profile = profiles[1];

    return profile.type === "student" ? (
        <StudentProfile profile={profile} />
    ) : (
        <ConsultantProfile profile={profile} />
    );
};

export default Profile;
