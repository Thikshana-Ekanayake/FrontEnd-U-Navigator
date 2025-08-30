// src/features/universities/hooks/useUniversityDegreesWithCount.js
import { useQuery } from "@tanstack/react-query";
import { getDegreesWithCountByUniversity} from "../../services/universities.service";

export function useUniversityDegreesWithCount(universityId) {
    return useQuery({
        queryKey: ["university", "degrees-with-count", universityId],
        queryFn: () => getDegreesWithCountByUniversity(universityId),
        enabled: !!universityId,
        staleTime: 2 * 60 * 1000,
        retry: 1,
    });
}
