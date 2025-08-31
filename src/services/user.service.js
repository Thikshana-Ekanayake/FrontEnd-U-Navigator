import { api } from "../api/client";
import { endpoints } from "../api/endpoints";
import { absoluteUrl} from "../../utils/url";

export async function getUserProfile() {
    const { data } = await api.get(endpoints.user.profile); // JWT via interceptor

    const ug = data?.userGeneral || {};
    const user = data?.user || {};
    const student = data?.student || {};

    return {
        userId: user.id ?? null,
        studentId: student.id ?? null,
        districtId: student.districtId ?? null,
        zScore: typeof student.zScore === "number" ? student.zScore : null,
        displayName:
            [ug.firstName, ug.lastName].filter(Boolean).join(" ").trim() ||
            user.username ||
            "User",
        avatarUrl: absoluteUrl(ug.profileImageUrl) || null,   // <-- use absolute URL for RN <Image />
        raw: data,
    };
}

export async function getUserById(userId) {
    const { data } = await api.get(endpoints.user.byId(userId)); // JWT auto-attached
    const ug = data?.userGeneral || {};
    const u  = data?.user || {};
    const displayName =
        [ug.firstName, ug.lastName].filter(Boolean).join(" ").trim() || u.username || "User";

    return {
        id: u.id,
        displayName,
        role: u.role || null,
        avatarUrl: absoluteUrl(ug.profileImageUrl) || null,
    };
}
