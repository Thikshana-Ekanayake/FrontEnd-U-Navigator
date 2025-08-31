import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

export async function getZScoresByDegree(degreeId) {
    const { data } = await api.get(endpoints.zscore.byDegree(degreeId));
    const arr = Array.isArray(data) ? data : [];
    return arr.map((z) => ({
        id: z.id,
        degreeId: z.degreeId,
        districtId: z.districtId,
        scoreValue: typeof z.scoreValue === "number" ? z.scoreValue : null,
        year: Number(z.year),
    }));
}
