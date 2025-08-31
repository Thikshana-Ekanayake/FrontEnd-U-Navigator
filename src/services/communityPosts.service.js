import { api } from "../api/client";
import { endpoints } from "../api/endpoints";
import { getUserById } from "./user.service";
import { absoluteUrl} from "../../utils/url";

export async function createCommunityPost(payload) {
    const form = new FormData();
    form.append("UserId", String(payload.userId));
    form.append("DegreeId", String(payload.degreeId));
    form.append("Caption", payload.caption ?? "");
    form.append("PostType", (payload.postType || "text").toLowerCase()); // backend expects a string
    form.append("ActiveStatus", "Active");

    if (payload.postType === "image" && payload.imageAsset?.uri) {
        const uri = payload.imageAsset.uri;
        const name =
            payload.imageAsset.fileName ||
            `upload_${Date.now()}.${(uri.split(".").pop() || "jpg").replace(/\?.*$/, "")}`;
        const type = payload.imageAsset.mimeType || "image/jpeg";
        form.append("Image", { uri, name, type });
    }

    const { data } = await api.post(endpoints.communityPosts.create, form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

export async function getCommunityPostsByDegree(degreeId) {
    const { data } = await api.get(endpoints.communityPosts.byDegree(degreeId));
    const rows = Array.isArray(data) ? data : [];

    // collect all user IDs (authors + commenters) for hydration
    const ids = new Set();
    rows.forEach((p) => {
        if (p.userId) ids.add(p.userId);
        (p.comments || []).forEach((c) => c.userId && ids.add(c.userId));
    });

    const hydrated = await Promise.all([...ids].map((id) => getUserById(id).catch(() => null)));
    const users = new Map(hydrated.filter(Boolean).map((u) => [u.id, u]));

    return rows
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((p) => {
            const author = users.get(p.userId);
            const images =
                p.postType?.toLowerCase() === "image" && p.imageUrl ? [absoluteUrl(p.imageUrl)] : [];

            const commentItems = (p.comments || []).map((c) => {
                const u = users.get(c.userId);
                return {
                    id: c.id,
                    userId: c.userId,
                    userName: u?.displayName || "User",
                    userImage: u?.avatarUrl || null,
                    text: c.commentText || "",
                    createdAt: c.createdAt,
                };
            });

            return {
                id: p.id,
                degreeId: p.degreeId,
                postType: (p.postType || "").trim().toUpperCase(), // e.g., "IMAGE" | "QUESTION"
                userId: p.userId,
                userName: author?.displayName || "User",
                userRole: author?.role || null,
                userImage: author?.avatarUrl || null,
                text: p.caption || "",
                images,
                likes: p.reactionCount ?? 0,
                comments: commentItems.length, // numeric count for PostCard
                commentItems,                  // full comments for Q&A answers
                createdAt: p.createdAt,
            };
        });
}

// Reuse the same shape you used for degree feed mapping
export async function getAllCommunityPosts() {
    const { data } = await api.get(endpoints.communityPosts.list);
    const rows = Array.isArray(data) ? data : [];

    const ids = new Set();
    rows.forEach((p) => {
        if (p.userId) ids.add(p.userId);
        (p.comments || []).forEach((c) => c.userId && ids.add(c.userId));
    });

    const peopleArr = await Promise.all([...ids].map((id) => getUserById(id).catch(() => null)));
    const people = new Map(peopleArr.filter(Boolean).map((u) => [u.id, u]));

    return rows
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((p) => {
            const author = people.get(p.userId);
            const images =
                (p.postType || "").toLowerCase() === "image" && p.imageUrl
                    ? [absoluteUrl(p.imageUrl)]
                    : [];

            const commentItems = (p.comments || []).map((c) => {
                const u = people.get(c.userId);
                return {
                    id: c.id,
                    userId: c.userId,
                    userName: u?.displayName || "User",
                    userImage: u?.avatarUrl || null,
                    text: c.commentText || "",
                    createdAt: c.createdAt,
                };
            });

            return {
                id: p.id,
                degreeId: p.degreeId || null,
                postType: (p.postType || "").trim().toUpperCase(), // "IMAGE" | "QUESTION" | ...
                userId: p.userId,
                userName: author?.displayName || "User",
                userRole: author?.role || null,
                userImage: author?.avatarUrl || null,
                text: p.caption || "",
                images,
                likes: p.reactionCount ?? 0,
                comments: commentItems.length,
                commentItems,
                createdAt: p.createdAt,
            };
        });
}

