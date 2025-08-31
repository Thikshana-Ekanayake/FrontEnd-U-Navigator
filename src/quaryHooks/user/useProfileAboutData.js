import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useProfile } from "./useProfile"; // your existing hook that calls /api/user/profile

const normType = (t) => (t || "").toUpperCase().replace(/[^A-Z]/g, ""); // "OL" | "AL"

export function useProfileAboutData() {
    // 1) who am I?
    const { data: me, isLoading: pLoading, isError: pErr, refetch: refetchP } = useProfile();

    // Handle both shapes (some apps keep nested 'student' on the profile)
    const studentId  = me?.student?.id ?? me?.studentId ?? null;
    const streamId   = me?.student?.streamId ?? me?.streamId ?? null;
    const userZScore = typeof (me?.student?.zScore) === "number"
        ? me.student.zScore
        : (typeof me?.zScore === "number" ? me.zScore : null);

    // 2) stream name
    const streamQ = useQuery({
        queryKey: ["stream", streamId],
        enabled: !!streamId,
        queryFn: async () => {
            const { data } = await api.get(endpoints.stream.byId(streamId));
            return { id: data?.id, name: data?.name || data?.metaCode || "Stream" };
        },
        staleTime: 5 * 60 * 1000,
    });

    // 3) subject results (split into AL / OL)
    const resultsQ = useQuery({
        queryKey: ["studentResults", studentId],
        enabled: !!studentId,
        queryFn: async () => {
            const { data } = await api.get(endpoints.studentResults.byStudent(studentId));
            const rows = Array.isArray(data) ? data : [];

            const al = [];
            const ol = [];
            rows.forEach((r) => {
                const entry = {
                    subject: r.subjectName || "Subject",
                    grade: r.resultName || r.result || "-",
                    type: normType(r.subjectType),
                };
                if (entry.type === "AL") al.push({ subject: entry.subject, grade: entry.grade });
                else if (entry.type === "OL") ol.push({ subject: entry.subject, grade: entry.grade });
            });

            // optional: sort alphabetically
            al.sort((a, b) => a.subject.localeCompare(b.subject));
            ol.sort((a, b) => a.subject.localeCompare(b.subject));

            return { al, ol };
        },
        staleTime: 2 * 60 * 1000,
    });

    const isLoading = pLoading || streamQ.isLoading || resultsQ.isLoading;
    const isError   = pErr || streamQ.isError || resultsQ.isError;

    const refetch = () => {
        refetchP();
        streamQ.refetch();
        resultsQ.refetch();
    };

    // Shape it for AboutTab (matches your props)
    const aboutData = useMemo(() => ({
        stream   : streamQ.data?.name ?? "",                 // Advanced Level Stream
        subjects : resultsQ.data?.al ?? [],                  // A/L subjects
        zScore   : typeof userZScore === "number" ? String(userZScore) : "", // Z-score
        olResults: resultsQ.data?.ol ?? [],                  // O/L subjects
    }), [streamQ.data, resultsQ.data, userZScore]);

    return { aboutData, isLoading, isError, refetch };
}
