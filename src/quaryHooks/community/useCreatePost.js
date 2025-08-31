// src/features/community/hooks/useCreatePost.js
import { useMutation } from "@tanstack/react-query";
import { createCommunityPost} from "../../services/communityPosts.service";

export function useCreatePost() {
    return useMutation({
        mutationFn: createCommunityPost,
    });
}
