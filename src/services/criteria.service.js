import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

/**
 * Example record (backend):
 * { id, subjectId, subjectMetaCode, subjectName, subjectType: 'OL'|'AL',
 *   degreeId, degreeUniCode, resultId, resultMetaCode: 'S'|'C'|'B'|'A'|'A+',
 *   isMandatory: boolean }
 */
export async function getCriteriaByDegreeId(degreeId) {
    const { data } = await api.get(endpoints.criteria.byDegreeId(degreeId));
    const arr = Array.isArray(data) ? data : [];
    const normalized = arr.map((c) => ({
        id: c.id,
        subjectId: c.subjectId || null,
        subjectName: (c.subjectName || "").trim(),
        subjectType: (c.subjectType || "").toUpperCase(), // 'OL' or 'AL'
        minGrade: (c.resultMetaCode || "").toUpperCase(),  // e.g., 'C' or 'S'
        isMandatory: !!c.isMandatory,
    }));

    return {
        ol: normalized.filter((c) => c.subjectType === "OL"),
        al: normalized.filter((c) => c.subjectType === "AL"),
        all: normalized,
    };
}
