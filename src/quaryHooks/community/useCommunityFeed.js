// src/features/community/hooks/useCommunityFeed.js
import { useQuery } from "@tanstack/react-query";
import { getAllCommunityPosts} from "../../services/communityPosts.service";

export function useCommunityFeed() {
    return useQuery({
        queryKey: ["community", "feed", "all"],
        queryFn: getAllCommunityPosts,
        staleTime: 60 * 1000,
        retry: 1,
    });
}
