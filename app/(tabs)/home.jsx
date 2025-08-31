// app/screens/home/index.jsx  (or your Home component path)
import React, { useMemo } from "react";
import { View, FlatList, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "../../components/community/PostCard";
import CustomSlidableCard from "../../components/CustomSlidableCard";
import QACard from "../../components/community/QACard";
import PostCreationHead from "../../components/community/PostCreationHead";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useCommunityFeed} from "../../src/quaryHooks/community/useCommunityFeed";
import { useDegreesMostInterested} from "../../src/quaryHooks/degrees/useDegreesMostInterested";
import { useProfile} from "../../src/quaryHooks/user/useProfile";

const Home = () => {
    const route = useRoute();
    const navigation = useNavigation();

    // LIVE data
    const { data: feed = [], isLoading, isError, refetch, isRefetching } = useCommunityFeed();
    const { data: mostInterested = [], isLoading: degLoading } = useDegreesMostInterested(10);

    // Current user profile (for avatar)
    const { data: me, isLoading: meLoading } = useProfile();
    const avatar = me?.avatarUrl || "https://ui-avatars.com/api/?name=U&background=DDD&color=555";

    // Split feed: posts vs questions (Q&A)
    const { firstPost, remainingPosts, qaItems } = useMemo(() => {
        const posts = [];
        const qas = [];
        (feed || []).forEach((p) => {
            if ((p.postType || "") === "QUESTION") {
                qas.push({
                    id: p.id,
                    userName: p.userName,
                    userRole: p.userRole,
                    userImage: p.userImage,
                    text: p.text,
                    timestamp: new Date(p.createdAt).getTime(),
                    answers: (p.commentItems || []).map((c) => ({
                        user: c.userName,
                        role:c.userRole,
                        text: c.text,
                        timestamp: new Date(c.createdAt).getTime(),
                        userImage: c.userImage,
                    })),
                });
            } else {
                posts.push(p);
            }
        });

        return {
            firstPost: posts[0] || null,
            remainingPosts: posts.slice(1),
            qaItems: qas,
        };
    }, [feed]);

    // Map degrees into CustomSlidableCard items
    const mostInterestedCards = useMemo(
        () =>
            (mostInterested || []).map((d) => ({
                id: d.id,
                title: d.name,
                image: d.imageUrl || "",
                subtitle: `${d.interestCount} interested`,
                engagement: d.engagementCount,
                interested: d.interestCount,
            })),
        [mostInterested]
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="p-4"
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Text className="text-lg font-bold text-primary-g2">
                            U - <Text className="text-accent">N</Text>avigator
                        </Text>
                    </View>
                </View>

                {/* Post Creation (now shows current user's avatar) */}
                <PostCreationHead
                    profileImage={avatar}
                    // you can also pass a loading flag if your component supports it:
                    // loading={meLoading}
                />


                {/* Loading / Error states */}
                {isLoading ? (
                    <View className="py-10 items-center">
                        <ActivityIndicator />
                        <Text className="mt-2">Loading feed…</Text>
                    </View>
                ) : isError ? (
                    <View className="py-10 items-center">
                        <Text className="text-red-500">Failed to load feed.</Text>
                        <Text className="text-blue-600 mt-2" onPress={refetch}>Tap to retry</Text>
                    </View>
                ) : (
                    <>
                        {/* First post */}
                        {firstPost && <PostCard post={firstPost} />}

                        {/* Most Interested Section (replaces Recommended) */}
                        <View className="mb-3 border-b-[0.5px] border-smoke pb-3">
                            <Text className="text-lg font-bold mt-4 mb-2">Most Interested</Text>

                            {degLoading ? (
                                <ActivityIndicator />
                            ) : (
                                <FlatList
                                    data={mostInterestedCards}
                                    horizontal
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <CustomSlidableCard
                                            item={item}
                                            onPress={() => navigation.navigate("screens/degree/degree-detail", { id: item.id })}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                />
                            )}
                        </View>

                        {/* Remaining posts */}
                        {remainingPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}

                        {/* Q&A from question-type posts */}
                        {qaItems.map((q) => (
                            <QACard key={q.id} question={q} />
                        ))}

                        {!firstPost && !remainingPosts.length && !qaItems.length && (
                            <Text className="text-gray-500 text-center mt-4">No posts yet.</Text>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
