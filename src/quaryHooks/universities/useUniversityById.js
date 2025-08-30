// src/features/universities/hooks/useUniversityById.js
import { useQuery } from "@tanstack/react-query";
import { getUniversityById} from "../../services/universities.service";

export function useUniversityById(id) {
    return useQuery({
        queryKey: ["university", id],
        queryFn: () => getUniversityById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}
