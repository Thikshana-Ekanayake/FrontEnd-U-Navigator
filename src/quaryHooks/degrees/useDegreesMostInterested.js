// src/features/degrees/hooks/useDegreesMostInterested.js
import { useQuery } from "@tanstack/react-query";
import { getAllDegrees} from "../../services/degrees.service";

export function useDegreesMostInterested(limit = 10) {
    return useQuery({
        queryKey: ["degrees", "most-interested", limit],
        queryFn: async () => {
            const items = await getAllDegrees();
            return items
                .slice()
                .sort((a, b) => (b.interestCount ?? 0) - (a.interestCount ?? 0))
                .slice(0, limit);
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}
