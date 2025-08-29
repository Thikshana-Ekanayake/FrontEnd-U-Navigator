import { useQuery } from "@tanstack/react-query";
import { getAllDegrees} from "../../services/degrees.service";

export function useDegrees() {
    return useQuery({
        queryKey: ["degrees", "all"],
        queryFn: getAllDegrees,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}
