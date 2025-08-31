import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

export async function getUserProfile() {
    const { data } = await api.get(endpoints.user.profile); // JWT from axios interceptor
    const student = data?.student || {};
    return {
        userId: data?.user?.id ?? null,
        studentId: student.id ?? null,
        districtId: student.districtId ?? null,
        zScore: typeof student.zScore === "number" ? student.zScore : null,
        raw: data,
    };
}
