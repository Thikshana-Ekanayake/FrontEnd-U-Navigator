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
