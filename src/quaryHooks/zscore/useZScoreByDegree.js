import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

export function useZScoreByDegree(degreeId) {
    return useQuery({
        queryKey: ["zscore", "byDegree", degreeId],
        enabled: !!degreeId,
        queryFn: async () => {
            const { data } = await api.get(endpoints.zscore.byDegree(degreeId));
            const rows = Array.isArray(data) ? data : [];

            // unique years (desc)
            const yearsSet = new Set(rows.map((r) => String(r.year)));
            const years = [...yearsSet]
                .sort((a, b) => Number(b) - Number(a))
                .map((y) => ({ label: y, value: y }));

            // unique districts → hydrate names
            const districtIds = [...new Set(rows.map((r) => r.districtId).filter(Boolean))];

            const districtMap = new Map();
            await Promise.all(
                districtIds.map(async (id) => {
                    try {
                        const { data: d } = await api.get(endpoints.district.byId(id));
                        const name = d?.name || d?.metaCode || "District";
                        districtMap.set(id, name);
                    } catch {
                        districtMap.set(id, "District");
                    }
                })
            );

            const locations = districtIds
                .map((id) => ({ label: districtMap.get(id) || "District", value: id }))
                .sort((a, b) => a.label.localeCompare(b.label));

            return {
                years,
                locations,
                items: rows, // {degreeId, districtId, scoreValue, year}
            };
        },
        staleTime: 5 * 60 * 1000,
    });
}
