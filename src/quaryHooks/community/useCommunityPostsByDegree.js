import { useQuery } from "@tanstack/react-query";
import { getCommunityPostsByDegree} from "../../services/communityPosts.service";

export function useCommunityPostsByDegree(degreeId) {
    return useQuery({
        queryKey: ["community", "posts", degreeId],
        queryFn: () => getCommunityPostsByDegree(degreeId),
        enabled: !!degreeId,
        staleTime: 60 * 1000,
        retry: 1,
    });
}
