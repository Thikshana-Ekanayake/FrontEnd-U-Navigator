import { useQuery } from "@tanstack/react-query";
import { getDegreeActivity} from "../../services/degrees.service";

export function useDegreeActivity(degreeId) {
    return useQuery({
        queryKey: ["degree", "activity", degreeId],
        queryFn: () => getDegreeActivity(degreeId),
        enabled: !!degreeId,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}
