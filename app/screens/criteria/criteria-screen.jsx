import React, { useState } from "react";
import { View, Text } from "react-native";
import { CheckCircle, XCircle, Circle } from "lucide-react-native";
import { CustomDropdown } from "../../../components";

const years = [
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
];

const locations = [
    { label: "Kandy", value: "Kandy" },
    { label: "Colombo", value: "Colombo" },
    { label: "Galle", value: "Galle" },
    { label: "Jaffna", value: "Jaffna" },
];

// Grade ranking map for comparison
const gradeOrder = {
    "S": 1,
    "C": 2,
    "B": 3,
    "A": 4,
    "A+": 5,
};

// Function to check if a user's grade meets the required minimum grade
const isGradeSufficient = (userGrade, requiredGrade) => {
    return gradeOrder[userGrade] >= gradeOrder[requiredGrade];
};

// User's academic results (replace with actual user data)
const userALResults = [
    { subject: "Higher Mathematics", grade: "B" },
    { subject: "Physics", grade: "C" },
    { subject: "Chemistry", grade: "S" },
];

const userOLResults = { English: "C", Mathematics: "S" };
const userZScore = 1.567;

// Degree requirements with grade constraints
const degreeALCriteria = [
    { subject: "Higher Mathematics", minGrade: "S" },
    { subject: "Chemistry", minGrade: "S" },
    { subject: "Combined Mathematics", minGrade: "S" },
    { subject: "Accounting", minGrade: "S" },
    { subject: "Business Statistics", minGrade: "S" },
    { subject: "Physics", minGrade: "S" },
    { subject: "Information & Communication Technology", minGrade: "S" },
];

const requiredOLSubjects = { English: "C", Mathematics: "C" };
const minimumZScore = 1.5;

// Function to check if AL requirements are met
const checkALRequirements = () => {
    let count = 0;

    degreeALCriteria.forEach(criteria => {
        const userSubject = userALResults.find(
            entry => entry.subject === criteria.subject && isGradeSufficient(entry.grade, criteria.minGrade)
        );
        if (userSubject) count++;
    });

    return count >= 2; // At least two subjects should match the criteria
};

// Function to check if OL requirements are met
const checkOLRequirements = () => {
    return (
        isGradeSufficient(userOLResults.English, requiredOLSubjects.English) &&
        isGradeSufficient(userOLResults.Mathematics, requiredOLSubjects.Mathematics)
    );
};

// Function to check Z-Score requirement
const checkZScore = () => userZScore >= minimumZScore;

const CriteriaScreen = () => {
    const [selectedYear, setSelectedYear] = useState("2023");
    const [selectedLocation, setSelectedLocation] = useState("Kandy");

    return (
        <View className="mt-5 px-4">
            {/* AL Requirements */}
            <View className="border border-gray-300 rounded-lg p-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold">AL Requirements</Text>
                    <View className={`${checkALRequirements() ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-full`}>
                        <Text className="text-xs font-bold text-white">
                            {checkALRequirements() ? "Criteria Satisfied" : "Criteria Not Satisfied"}
                        </Text>
                    </View>
                </View>

                <Text className="text-sm mt-2">
                    The candidate should have passed at least two of the following subjects with a minimum grade of 'S':
                </Text>

                <View className="mt-2">
                    {degreeALCriteria.map((criteria, index) => {
                        const userSubject = userALResults.find(
                            entry => entry.subject === criteria.subject && isGradeSufficient(entry.grade, criteria.minGrade)
                        );
                        return (
                            <View key={index} className="flex-row items-center mt-1">
                                {userSubject ? (
                                    <CheckCircle size={16} color="green" />
                                ) : (
                                    <XCircle size={16} color="red" />
                                )}
                                <Text className="ml-2 text-sm">
                                    {criteria.subject}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* OL Requirements */}
            <View className="border border-gray-300 rounded-lg p-4 mt-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold">OL Requirements</Text>
                    <View className={`${checkOLRequirements() ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-full`}>
                        <Text className="text-xs font-bold text-white">
                            {checkOLRequirements() ? "Criteria Satisfied" : "Criteria Not Satisfied"}
                        </Text>
                    </View>
                </View>

                <Text className="text-sm mt-2">
                    Candidates should have at least a Credit Pass (C) in the following subjects:
                </Text>

                <View className="mt-2">
                    {Object.keys(requiredOLSubjects).map((subject, index) => (
                        <View key={index} className="flex-row items-center mt-1">
                            {isGradeSufficient(userOLResults[subject], requiredOLSubjects[subject]) ? (
                                <CheckCircle size={16} color="green" />
                            ) : (
                                <XCircle size={16} color="red" />
                            )}
                            <Text className="ml-2 text-sm">
                                {`At least a Credit Pass (C) in ${subject}`}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Z Score */}
            <View className="border border-gray-300 rounded-lg p-4 mt-4">
                <View className="flex-row items-center">
                    <Circle size={16} color="blue" fill="blue" />
                    <Text className="ml-2 text-lg font-bold">Z Score</Text>
                </View>

                <View className="mt-2">
                    {/* Custom Dropdowns */}
                    <CustomDropdown
                        title="Select Year"
                        items={years}
                        selectedValue={selectedYear}
                        setSelectedValue={setSelectedYear}
                        buttonStyle="flex-row justify-between items-center px-4 py-3 mt-4 mb-1 border border-gray-300 rounded-lg bg-gray-100"
                    />

                    <CustomDropdown
                        title="Select Location"
                        items={locations}
                        selectedValue={selectedLocation}
                        setSelectedValue={setSelectedLocation}
                        buttonStyle="flex-row justify-between items-center px-4 py-3 mt-4 mb-1 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </View>

                <Text className="mt-4 text-xl font-bold text-blue-600">{userZScore}</Text>

                <View className="flex-row items-center mt-2">
                    {checkZScore() ? (
                        <CheckCircle size={16} color="green" />
                    ) : (
                        <XCircle size={16} color="red" />
                    )}
                    <Text className="ml-2 text-sm">
                        {`Minimum required Z Score: ${minimumZScore}`}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CriteriaScreen;
