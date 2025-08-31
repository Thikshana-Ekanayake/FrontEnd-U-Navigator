import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

// helpers
const normName = (s) => (s || "").trim().toLowerCase();
const normType = (t) => (t || "").toUpperCase().replace(/[^A-Z]/g, ""); // "OL" | "AL" | ""

// build student result maps from API rows
function buildStudentResultMaps(rows = []) {
    const bySubjectId = new Map();
    const bySubjectName = new Map();

    rows.forEach((r) => {
        const item = {
            // normalize to { result, subjectType, subjectName, subjectId }
            result: r.resultName ?? r.result ?? null,
            subjectType: normType(r.subjectType), // OL/AL
            subjectName: r.subjectName || "",
            subjectId: r.subjectId || null,
        };
        if (r.subjectId) bySubjectId.set(r.subjectId, item);
        if (r.subjectName) bySubjectName.set(normName(r.subjectName), item);
    });

    return { bySubjectId, bySubjectName };
}

export function useCriteriaData({ degreeId, userId }) {
    // 1) degree meta (AL/OL descriptions + min counts)
    const degreeMetaQ = useQuery({
        queryKey: ["degreeMeta", degreeId],
        enabled: !!degreeId,
        queryFn: async () => {
            const { data } = await api.get(endpoints.degrees.byId(degreeId));
            return {
                olCriteriaDescription: data?.olCriteriaDescription ?? null,
                olCriteriaMinCount:
                    Number.isFinite(data?.olCriteriaMinCount) ? data.olCriteriaMinCount : 0,
                alCriteriaDescription: data?.alCriteriaDescription ?? null,
                alCriteriaMinCount:
                    Number.isFinite(data?.alCriteriaMinCount) ? data.alCriteriaMinCount : 2,
            };
        },
        staleTime: 5 * 60 * 1000,
    });

    // 2) criteria by degree
    const criteriaQ = useQuery({
        queryKey: ["criteria", degreeId],
        enabled: !!degreeId,
        queryFn: async () => {
            const { data } = await api.get(endpoints.criteria.byDegreeId(degreeId));
            const arr = Array.isArray(data) ? data : [];

            // Ensure minGrade & normalized subjectType
            const normalized = arr.map((c) => ({
                ...c,
                subjectType: normType(c.subjectType),
                minGrade: c.minGrade ?? c.resultMetaCode ?? "S",
                subjectName: c.subjectName || "",
            }));

            return {
                ol: normalized.filter((x) => x.subjectType === "OL"),
                al: normalized.filter((x) => x.subjectType === "AL"),
            };
        },
        staleTime: 5 * 60 * 1000,
    });

    // 3) student results → need studentId; get it from profile
    const profileQ = useQuery({
        queryKey: ["profile", "forCriteria"],
        queryFn: async () => {
            const { data } = await api.get(endpoints.user.profile);
            return {
                studentId: data?.student?.id ?? null,
            };
        },
        staleTime: 2 * 60 * 1000,
    });

    const studentResultsQ = useQuery({
        queryKey: ["studentResults", profileQ.data?.studentId],
        enabled: !!profileQ.data?.studentId,
        queryFn: async () => {
            const { data } = await api.get(
                endpoints.studentResults.byStudent(profileQ.data.studentId)
            );
            return buildStudentResultMaps(Array.isArray(data) ? data : []);
        },
        staleTime: 2 * 60 * 1000,
    });

    const isLoading =
        degreeMetaQ.isLoading || criteriaQ.isLoading || profileQ.isLoading || studentResultsQ.isLoading;
    const isError =
        degreeMetaQ.isError || criteriaQ.isError || profileQ.isError || studentResultsQ.isError;

    const refetchAll = () => {
        degreeMetaQ.refetch();
        criteriaQ.refetch();
        profileQ.refetch();
        studentResultsQ.refetch();
    };

    // combine meta + defaults
    const degreeMeta = useMemo(
        () => ({
            olCriteriaDescription: degreeMetaQ.data?.olCriteriaDescription ?? null,
            olCriteriaMinCount:
                Number.isFinite(degreeMetaQ.data?.olCriteriaMinCount)
                    ? degreeMetaQ.data.olCriteriaMinCount
                    : 0,
            alCriteriaDescription: degreeMetaQ.data?.alCriteriaDescription ?? null,
            alCriteriaMinCount:
                Number.isFinite(degreeMetaQ.data?.alCriteriaMinCount)
                    ? degreeMetaQ.data.alCriteriaMinCount
                    : 2,
        }),
        [degreeMetaQ.data]
    );

    return {
        degreeMeta,
        criteria: criteriaQ.data || { ol: [], al: [] },
        studentResults: studentResultsQ.data || { bySubjectId: new Map(), bySubjectName: new Map() },
        isLoading,
        isError,
        refetchAll,
    };
}
