import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

/**
 * Example record (backend):
 * {
 *   id, studentId, subjectId, subjectName, resultId, resultName, createdAt, updatedAt
 * }
 */
export async function getStudentResultsByStudentId(studentId) {
    const { data } = await api.get(endpoints.studentResults.byStudent(studentId));
    const arr = Array.isArray(data) ? data : [];
    // Normalize & indexable maps for fast lookups
    const items = arr.map((r) => ({
        id: r.id,
        subjectId: r.subjectId || null,
        subjectType: r.subjectType || null,
        subjectName: r.subjectName?.trim() || null,
        result: r.resultName?.trim()?.toUpperCase() || null,  // e.g., 'A', 'B', 'C', 'S'
    }));

    const bySubjectId = new Map(items.filter(i => i.subjectId).map(i => [i.subjectId, i]));
    const bySubjectName = new Map(
        items
            .filter(i => i.subjectName)
            .map(i => [i.subjectName.toLowerCase(), i])
    );

    return { items, bySubjectId, bySubjectName };
}
