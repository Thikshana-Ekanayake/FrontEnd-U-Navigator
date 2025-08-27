import { useQuery } from "@tanstack/react-query";
import { getAllUniversities} from "../../services/universities.service";

export function useUniversities() {
    return useQuery({
        queryKey: ["universities", "all"],
        queryFn: getAllUniversities,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}
