import { useQuery } from "@tanstack/react-query";
import { getUserProfile} from "../../services/user.service";

export function useProfile() {
    return useQuery({
        queryKey: ["user", "profile"],
        queryFn: getUserProfile,
        staleTime: 5 * 60 * 1000,
    });
}
