import { useQuery } from "@tanstack/react-query";
import { getZScoresByDegree} from "../../services/zscore.service";
import { getDistrictMap} from "../../services/district.service";

export function useZScoreByDegree(degreeId) {
    return useQuery({
        queryKey: ["zscore", "degree", degreeId],
        enabled: !!degreeId,
        staleTime: 5 * 60 * 1000,
        retry: 1,
        queryFn: async () => {
            const zscores = await getZScoresByDegree(degreeId);
            const districtMap = await getDistrictMap(zscores.map((z) => z.districtId));

            const items = zscores.map((z) => ({
                ...z,
                districtName: districtMap.get(z.districtId)?.name ?? z.districtId,
            }));

            const years = [...new Set(items.map((i) => i.year))]
                .sort((a, b) => b - a)
                .map((y) => ({ label: String(y), value: String(y) }));

            const locations = [...new Set(items.map((i) => i.districtId))]
                .map((id) => ({ label: districtMap.get(id)?.name ?? id, value: id }))
                .sort((a, b) => a.label.localeCompare(b.label));

            return { items, years, locations };
        },
    });
}
