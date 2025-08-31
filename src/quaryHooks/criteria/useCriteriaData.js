import { useQuery } from "@tanstack/react-query";
import { getStudentResultsByStudentId} from "../../services/studentResults.service";
import { getCriteriaByDegreeId} from "../../services/criteria.service";
import { getDegreeById} from "../../services/degrees.service";

export function useCriteriaData({ degreeId, userId }) {
    const degreeQ = useQuery({
        queryKey: ["degree", "meta", degreeId],
        queryFn: () => getDegreeById(degreeId),
        enabled: !!degreeId,
        staleTime: 5 * 60 * 1000,
    });

    const criteriaQ = useQuery({
        queryKey: ["criteria", "degree", degreeId],
        queryFn: () => getCriteriaByDegreeId(degreeId),
        enabled: !!degreeId,
        staleTime: 5 * 60 * 1000,
    });

    const resultsQ = useQuery({
        queryKey: ["studentResults", userId],
        queryFn: () => getStudentResultsByStudentId(userId),
        enabled: !!userId,
        staleTime: 2 * 60 * 1000,
    });

    return {
        degreeMeta: degreeQ.data,    // { alCriteriaMinCount, olCriteriaMinCount }
        criteria: criteriaQ.data,    // { ol, al }
        studentResults: resultsQ.data, // { items, bySubjectId, bySubjectName }
        isLoading: degreeQ.isLoading || criteriaQ.isLoading || resultsQ.isLoading,
        isError: degreeQ.isError || criteriaQ.isError || resultsQ.isError,
        refetchAll: () => {
            degreeQ.refetch();
            criteriaQ.refetch();
            resultsQ.refetch();
        },
    };
}
