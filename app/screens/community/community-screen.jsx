import React, { useMemo } from "react";
import { View, ScrollView, Text, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../../components/community/PostCard";
import QACard from "../../../components/community/QACard";
import { useCommunityPostsByDegree} from "../../../src/quaryHooks/community/useCommunityPostsByDegree";

const CommunitySection = ({ degreeId }) => {
    const { data: posts = [], isLoading, isError, refetch, isRefetching } =
        useCommunityPostsByDegree(degreeId);

    // Split: non-question posts go to feed; question posts -> Q&A (comments become answers)
    const { feedPosts, qaItems } = useMemo(() => {
        const feed = [];
        const qas = [];
        posts.forEach((p) => {
            if ((p.postType || "") === "QUESTION") {
                qas.push({
                    id: p.id,
                    degreeId: p.degreeId,
                    userName: p.userName,
                    userRole: p.userRole,
                    userImage: p.userImage,
                    text: p.text,
                    timestamp: new Date(p.createdAt).getTime(),
                    answers: (p.commentItems || []).map((c) => ({
                        user: c.userName,
                        text: c.text,
                        timestamp: new Date(c.createdAt).getTime(),
                        userImage: c.userImage,
                    })),
                });
            } else {
                feed.push(p); // IMAGE / TEXT / anything else
            }
        });
        return { feedPosts: feed, qaItems: qas };
    }, [posts]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="-mt-10"
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            >
                {isLoading ? (
                    <View className="py-10 items-center">
                        <ActivityIndicator />
                        <Text className="mt-2">Loading posts…</Text>
                    </View>
                ) : isError ? (
                    <View className="py-10 items-center">
                        <Text className="text-red-500">Failed to load community posts.</Text>
                        <Text className="text-blue-600 mt-2" onPress={refetch}>
                            Tap to retry
                        </Text>
                    </View>
                ) : (
                    <>
                        {/* Posts feed (non-questions) */}
                        {feedPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}

                        {/* Q&A items (postType === 'QUESTION'); answers from comments */}
                        {qaItems.map((question) => (
                            <QACard key={question.id} question={question} />
                        ))}

                        {!feedPosts.length && !qaItems.length && (
                            <Text className="text-gray-500 text-center mt-4">No community discussions yet.</Text>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CommunitySection;
