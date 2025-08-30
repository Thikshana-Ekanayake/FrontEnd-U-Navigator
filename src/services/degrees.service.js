import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

/** @param {import("../types/api.d").DegreeDto} dto */
function mapDegree(dto) {
    return {
        id: dto.id,
        name: dto.name,
        facultyId: dto.facultyId ?? null,
        universityId: dto.universityId ?? null,
        universityLogo: dto.universityLogoUrl ?? null,
        universityName: dto.universityName ?? null,
        uniCode: dto.uniCode ?? null,
        description: dto.description ?? null,
        imageUrl: dto.imageUrl ?? null,
        olCriteriaDescription: dto.olCriteriaDescription ?? null,
        alCriteriaDescription: dto.alCriteriaDescription ?? null,
        duration: dto.duration ?? null,
        degreeType: dto.degreeType ?? null,
        streams: Array.isArray(dto.stream) ? dto.stream : [],
    };
}

/** Get all degrees -> Degree[] */
export async function getAllDegrees() {
    const { data } = await api.get(endpoints.degrees.list);
    const list = Array.isArray(data) ? data : data?.items ?? [];
    return list.map(mapDegree);
}

/** Get degree + interest/engagement counts in one call */
export async function getDegreeActivity(id) {
    const { data } = await api.get(endpoints.degrees.activity(id));
    return {
        degree: mapDegree(data?.degree),
        interestCount: data?.interestCount ?? 0,
        engagementCount: data?.engagementCount ?? 0,
    };
}
