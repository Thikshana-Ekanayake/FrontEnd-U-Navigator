// app/screens/criteria/criteria-screen.jsx
import React, { useMemo, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { CheckCircle, XCircle, Circle } from "lucide-react-native";
import { CustomDropdown } from "../../../components";
import { useCriteriaData} from "../../../src/quaryHooks/criteria/useCriteriaData";

// Grade ranking map
const gradeOrder = { "S": 1, "C": 2, "B": 3, "A": 4, "A+": 5 };
// tolerant normalize
const normalizeGrade = (g) => (g || "").toUpperCase().replace(/\s+/g, "");
const gradeValue = (g) => gradeOrder[normalizeGrade(g)] ?? 0;
const isGradeSufficient = (userGrade, requiredGrade) => gradeValue(userGrade) >= gradeValue(requiredGrade);

// UI dropdowns (Z-score ignored for now)
const years = [
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
];
const locations = [
    { label: "Kandy", value: "Kandy" },
    { label: "Colombo", value: "Colombo" },
    { label: "Galle", value: "Galle" },
    { label: "Jaffna", value: "Jaffna" },
];

// Placeholder Z-score constants (ignored logic)
const minimumZScore = 1.5;
const userZScore = 1.567;

const CriteriaScreen = ({ degreeId, userId }) => {
    const [selectedYear, setSelectedYear] = useState("2023");
    const [selectedLocation, setSelectedLocation] = useState("Kandy");

    const { degreeMeta, criteria, studentResults, isLoading, isError, refetchAll } =
        useCriteriaData({ degreeId, userId });

    // Derive maps for quick checks
    const resById = studentResults?.bySubjectId ?? new Map();
    const resByName = studentResults?.bySubjectName ?? new Map();

    // Utility: does a given criterion pass based on user's results?
    const checkCriterion = (crit) => {
        // Prefer subjectId match if present
        let userRes = (crit.subjectId && resById.get(crit.subjectId)) || null;

        // Fallback to name (some results may have empty subjectName; hence guarded)
        if (!userRes && crit.subjectName) {
            userRes = resByName.get(crit.subjectName.toLowerCase()) || null;
        }

        if (!userRes || !userRes.result) return false;
        return isGradeSufficient(userRes.result, crit.minGrade);
    };

    // Split criteria by type
    const olCriteria = criteria?.ol ?? [];
    const alCriteria = criteria?.al ?? [];

    // Evaluate OL
    const {
        mandatoryOlPassCount,
        mandatoryOlTotal,
        optionalOlPassCount,
        optionalOlTotal,
        olSatisfied,
    } = useMemo(() => {
        const mandatory = olCriteria.filter((c) => c.isMandatory);
        const optional = olCriteria.filter((c) => !c.isMandatory);

        const mandatoryPass = mandatory.filter(checkCriterion).length;
        const optionalPass = optional.filter(checkCriterion).length;

        const olMinOpt = Number.isFinite(degreeMeta?.olCriteriaMinCount)
            ? degreeMeta.olCriteriaMinCount
            : 0;

        const satisfied =
            mandatoryPass === mandatory.length && // all mandatory must pass
            optionalPass >= olMinOpt;             // plus optional min-count if any

        return {
            mandatoryOlPassCount: mandatoryPass,
            mandatoryOlTotal: mandatory.length,
            optionalOlPassCount: optionalPass,
            optionalOlTotal: optional.length,
            olSatisfied: satisfied,
        };
    }, [olCriteria, degreeMeta, resById, resByName]);

    // Evaluate AL
    const {
        mandatoryAlPassCount,
        mandatoryAlTotal,
        alPassCount,
        alTotal,
        alSatisfied,
        alMinRequired,
    } = useMemo(() => {
        const mandatory = alCriteria.filter((c) => c.isMandatory);
        const optional  = alCriteria.filter((c) => !c.isMandatory);

        const mandatoryPass = mandatory.filter(checkCriterion).length;
        const optPass = optional.filter(checkCriterion).length;

        // Default to 2 if server doesn’t specify
        const alMin = Number.isFinite(degreeMeta?.alCriteriaMinCount)
            ? degreeMeta.alCriteriaMinCount
            : 2;

        const satisfied =
            mandatoryPass === mandatory.length &&
            (optPass + mandatoryPass) >= alMin;

        return {
            mandatoryAlPassCount: mandatoryPass,
            mandatoryAlTotal: mandatory.length,
            alPassCount: optPass + mandatoryPass,
            alTotal: alCriteria.length,
            alSatisfied: satisfied,
            alMinRequired: alMin,
        };
    }, [alCriteria, degreeMeta, resById, resByName]);

    if (isLoading) {
        return (
            <View className="mt-5 px-4 items-center">
                <ActivityIndicator />
                <Text style={{ marginTop: 8 }}>Loading criteria…</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="mt-5 px-4">
                <Text style={{ color: "red" }}>Failed to load criteria/results.</Text>
                <Text className="text-gray-500 mt-1">Check your network or try again.</Text>
                <Text className="text-blue-600 mt-2" onPress={refetchAll}>Tap to retry</Text>
            </View>
        );
    }

    return (
        <View className="mt-5 px-4">
            {/* AL Requirements */}
            <View className="border border-gray-300 rounded-lg p-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold">AL Requirements</Text>
                    <View className={`${alSatisfied ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-full`}>
                        <Text className="text-xs font-bold text-white">
                            {alSatisfied ? "Criteria Satisfied" : "Criteria Not Satisfied"}
                        </Text>
                    </View>
                </View>

                {alCriteria.length > 0 ? (
                    <>
                        <Text className="text-sm mt-2">
                            Candidate must satisfy{" "}
                            <Text className="font-bold">{alMinRequired}</Text> subject(s) in total
                            {mandatoryAlTotal > 0 ? (
                                <> including <Text className="font-bold">{mandatoryAlTotal}</Text> mandatory.</>
                            ) : null}
                        </Text>

                        <View className="mt-2">
                            {alCriteria.map((crit) => {
                                const pass = checkCriterion(crit);
                                return (
                                    <View key={crit.id} className="flex-row items-center mt-1">
                                        {pass ? <CheckCircle size={16} color="green" /> : <XCircle size={16} color="red" />}
                                        <Text className="ml-2 text-sm">
                                            {crit.subjectName || "Subject"} — min {crit.minGrade}
                                            {crit.isMandatory ? " (Mandatory)" : ""}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        <Text className="text-xs text-gray-500 mt-2">
                            Passed: {alPassCount}/{alTotal} (Mandatory passed: {mandatoryAlPassCount}/{mandatoryAlTotal})
                        </Text>
                    </>
                ) : (
                    <Text className="text-sm mt-2 text-gray-500">No A/L criteria provided.</Text>
                )}
            </View>

            {/* OL Requirements */}
            <View className="border border-gray-300 rounded-lg p-4 mt-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold">OL Requirements</Text>
                    <View className={`${olSatisfied ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-full`}>
                        <Text className="text-xs font-bold text-white">
                            {olSatisfied ? "Criteria Satisfied" : "Criteria Not Satisfied"}
                        </Text>
                    </View>
                </View>

                {olCriteria.length > 0 ? (
                    <>
                        <Text className="text-sm mt-2">
                            All mandatory O/L subjects must be satisfied
                            {Number.isFinite(degreeMeta?.olCriteriaMinCount) && degreeMeta.olCriteriaMinCount > 0
                                ? <> and at least <Text className="font-bold">{degreeMeta.olCriteriaMinCount}</Text> optional subject(s).</>
                                : "."}
                        </Text>

                        <View className="mt-2">
                            {olCriteria.map((crit) => {
                                const pass = checkCriterion(crit);
                                return (
                                    <View key={crit.id} className="flex-row items-center mt-1">
                                        {pass ? <CheckCircle size={16} color="green" /> : <XCircle size={16} color="red" />}
                                        <Text className="ml-2 text-sm">
                                            {crit.subjectName || "Subject"} — min {crit.minGrade}
                                            {crit.isMandatory ? " (Mandatory)" : ""}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        <Text className="text-xs text-gray-500 mt-2">
                            Optional passed: {optionalOlPassCount}/{optionalOlTotal} (Mandatory passed: {mandatoryOlPassCount}/{mandatoryOlTotal})
                        </Text>
                    </>
                ) : (
                    <Text className="text-sm mt-2 text-gray-500">No O/L criteria provided.</Text>
                )}
            </View>

            {/* Z Score (static UI for now) */}
            <View className="border border-gray-300 rounded-lg p-4 mt-4">
                <View className="flex-row items-center">
                    <Circle size={16} color="blue" fill="blue" />
                    <Text className="ml-2 text-lg font-bold">Z Score</Text>
                </View>

                <View className="mt-2">
                    <CustomDropdown
                        title="Select Year"
                        items={years}
                        selectedValue={selectedYear}
                        setSelectedValue={setSelectedYear}
                        buttonStyle="flex-row justify-between items-center px-4 py-3 mt-4 mb-1 border border-gray-300 rounded-lg bg-gray-100"
                    />

                    <CustomDropdown
                        title="Select Location"
                        items={locations}
                        selectedValue={selectedLocation}
                        setSelectedValue={setSelectedLocation}
                        buttonStyle="flex-row justify-between items-center px-4 py-3 mt-4 mb-1 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </View>

                <Text className="mt-4 text-xl font-bold text-blue-600">{userZScore}</Text>

                <View className="flex-row items-center mt-2">
                    {/* just visual; not hooked to backend yet */}
                    {userZScore >= minimumZScore ? (
                        <CheckCircle size={16} color="green" />
                    ) : (
                        <XCircle size={16} color="red" />
                    )}
                    <Text className="ml-2 text-sm">{`Minimum required Z Score: ${minimumZScore}`}</Text>
                </View>
            </View>
        </View>
    );
};

export default CriteriaScreen;
