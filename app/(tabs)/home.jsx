import React from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../components/community/PostCard";
import CustomSlidableCard from "../../components/CustomSlidableCard";
import PostCreationHead from "../../components/community/PostCreationHead";

const posts = [
    {
        id: "1",
        userName: "Thikshana Ekanayake",
        userRole: "Undergraduate",
        userImage: "https://randomuser.me/api/portraits/men/1.jpg",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQegrl92GbC9j5-nY_5DPzOvXLW4eJbtZWnYg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQegrl92GbC9j5-nY_5DPzOvXLW4eJbtZWnYg&s",
        ],
        likes: 12,
        comments: 5,
    },
    {
        id: "2",
        userName: "Iruka Pathirana",
        userRole: "School Student",
        userImage: "https://randomuser.me/api/portraits/women/2.jpg",
        text: "Excited to start my university journey!",
        images: [],
        likes: 30,
        comments: 8,
    },
];

const recommendations = [
    { id: "D1", title: "Bachelor of Science in Engineering Honours", image: "https://www.uominnovationfactory.com/wp-content/uploads/2023/05/UOM-Campus-scaled.jpg", views: 36000, interested: 5000 },
    { id: "D2", title: "BSc (Hons) in Artificial Intelligence", image: "https://www.uominnovationfactory.com/wp-content/uploads/2023/05/UOM-Campus-scaled.jpg", views: 45000, interested: 6500 },
];

const Home = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="p-4">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Text className="text-lg font-bold text-primary-g2">
                            U - <Text className="text-accent">N</Text>avigator
                        </Text>
                    </View>
                </View>

                {/* Post Creation Section */}
                <PostCreationHead profileImage="https://randomuser.me/api/portraits/women/3.jpg" />

                {/* Post Feed */}
                {posts.length > 0 && (
                    <>
                        <PostCard post={posts[0]} />

                        {/* Recommendations Section after first post */}
                        <View className="mb-3 border-b-[0.5px] border-smoke pb-3">
                            <Text className="text-lg font-bold mt-4 mb-2">Recommended</Text>
                            <FlatList
                                data={recommendations}
                                horizontal
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <CustomSlidableCard item={item} />}
                                showsHorizontalScrollIndicator={false}
                            />

                        </View>


                        {/* Render the remaining posts */}
                        {posts.slice(1).map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
