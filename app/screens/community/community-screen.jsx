import React from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../../components/community/PostCard";
import PostCreationHead from "../../../components/community/PostCreationHead";
import QACard from "../../../components/community/QACard";

const CommunitySection = ({ degreeId }) => {
    // Sample posts and questions - Ideally, these should be fetched from an API
    const posts = [
        {
            id: "1",
            degreeId: "D1", // Related degree
            userName: "Thikshana Ekanayake",
            userRole: "Undergraduate",
            userImage: "https://randomuser.me/api/portraits/men/1.jpg",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            images: [],
            likes: 12,
            comments: 5,
        },
        {
            id: "2",
            degreeId: "D2",
            userName: "Iruka Pathirana",
            userRole: "School Student",
            userImage: "https://randomuser.me/api/portraits/women/2.jpg",
            text: "Excited to start my university journey!",
            images: [],
            likes: 30,
            comments: 8,
        },
    ];

    const questions = [
        {
            id: "Q1",
            degreeId: "D1",
            userName: "Iruka Pathirana",
            userRole: "School Student",
            userImage: "https://randomuser.me/api/portraits/women/2.jpg",
            text: "What are the entry requirements for this degree?",
            timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
            answers: [
                { user: "Thikshana Ekanayake", text: "You need at least 3 A-level passes.", timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 },
            ],
        },
    ];

    // Filter posts and Q&A based on the selected degree
    const filteredPosts = posts.filter((post) => post.degreeId === degreeId);
    const filteredQuestions = questions.filter((question) => question.degreeId === degreeId);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="-mt-10">
                {/*<PostCreationHead profileImage="https://randomuser.me/api/portraits/women/3.jpg" />*/}

                {/* Render Posts */}
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}

                {/* Render Q&A */}
                {filteredQuestions.map((question) => (
                    <QACard key={question.id} question={question} />
                ))}

                {/* Show message if no content */}
                {filteredPosts.length === 0 && filteredQuestions.length === 0 && (
                    <Text className="text-gray-500 text-center mt-4">No community discussions yet.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CommunitySection;
