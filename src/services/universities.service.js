import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

/** @param {import("../types/api.d").UniversityDto} dto */
function mapUniversity(dto) {
    return {
        id: dto.id,
        name: dto.name,
        description: dto.description ?? null,
        address: dto.address ?? null,
        contact: {
            email: dto.contactEmail ?? null,
            phone: dto.contactPhone ?? null,
        },
        website: dto.website ?? null,
        logoUrl: dto.logoUrl ?? null,
        imageUrl: dto.imageUrl ?? null,
        locationUrl: dto.locationUrl ?? null,
        createdAt: dto.createdAt ?? null,
        updatedAt: dto.updatedAt ?? null,
    };
}

/** Get all universities -> University[] */
export async function getAllUniversities() {
    const { data } = await api.get(endpoints.universities.list);
    const list = Array.isArray(data) ? data : data?.items ?? [];
    return list.map(mapUniversity);
}

export async function getUniversityById(id) {
    const { data } = await api.get(endpoints.universities.byId(id));
    return mapUniversity(data);
}

/** Item: { id, name, imageUrl, interestCount, engagementCount }[] */
export async function getDegreesWithCountByUniversity(id) {
    const { data } = await api.get(endpoints.universities.degreesWithCount(id));
    const arr = Array.isArray(data) ? data : [];
    return arr.map((d) => ({
        id: d.id,
        name: d.name,
        imageUrl: d.imageUrl || null,
        interestCount: d.interestCount ?? 0,
        engagementCount: d.engagementCount ?? 0,
    }));
}
