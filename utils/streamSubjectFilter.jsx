import {streamSubjects} from "../constants/subjectsAndStreams/alSubjectsAndSteams";
export const getSubjectsForStream = (stream, currentIndex, selectedSubjects) => {
    const allSubjects = streamSubjects[stream] || [];

    const alreadySelected = selectedSubjects
        .map((s, i) => (i !== currentIndex ? s.subject : null))
        .filter(Boolean);

    return allSubjects
        .filter(subject => !alreadySelected.includes(subject))
        .map(subject => ({ label: subject, value: subject }));
};
