import React, { useMemo, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { CheckCircle, XCircle, Circle } from "lucide-react-native";
import { CustomDropdown } from "../../../components";
import { useCriteriaData } from "../../../src/quaryHooks/criteria/useCriteriaData";
import { useZScoreByDegree } from "../../../src/quaryHooks/zscore/useZScoreByDegree";
import { useProfile } from "../../../src/quaryHooks/user/useProfile";

// Grade ranking map
const gradeOrder = { S: 1, C: 2, B: 3, A: 4, "A+": 5 };
const normalizeGrade = (g) => (g || "").toUpperCase().replace(/\s+/g, "");
const gradeValue = (g) => gradeOrder[normalizeGrade(g)] ?? 0;
const isGradeSufficient = (userGrade, requiredGrade) => gradeValue(userGrade) >= gradeValue(requiredGrade);

// small utils
const normType = (t) => (t || "").toUpperCase().replace(/[^A-Z]/g, ""); // "OL","AL",""
const normName = (s) => (s || "").trim().toLowerCase();

const CriteriaScreen = ({ degreeId, userId }) => {
    // criteria + student results (normalized)
    const { degreeMeta, criteria, studentResults, isLoading, isError, refetchAll } =
        useCriteriaData({ degreeId, userId });

    // z-score & profile
    const { data: zData, isLoading: zLoading, isError: zErr, refetch: refetchZ } =
        useZScoreByDegree(degreeId);
    const { data: profile, isLoading: pLoading, isError: pErr, refetch: refetchP } = useProfile();

    // z-score dropdowns
    const yearOptions = zData?.years ?? [];
    const locationOptions = zData?.locations ?? []; // {label, value: districtId}
    const zItems = zData?.items ?? [];

    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        if (yearOptions.length && !selectedYear) setSelectedYear(yearOptions[0].value);
    }, [yearOptions, selectedYear]);

    useEffect(() => {
        if (!selectedLocation) {
            const userDistrictId = profile?.districtId ?? null;
            const found = locationOptions.find((o) => o.value === userDistrictId);
            setSelectedLocation((found?.value ?? locationOptions[0]?.value) || null);
        }
    }, [locationOptions, profile, selectedLocation]);

    const minZScore = useMemo(() => {
        if (!selectedYear || !selectedLocation) return null;
        const match = zItems.find(
            (i) => String(i.year) === String(selectedYear) && i.districtId === selectedLocation
        );
        return typeof match?.scoreValue === "number" ? match.scoreValue : null;
    }, [selectedYear, selectedLocation, zItems]);

    const userZ = typeof profile?.zScore === "number" ? profile.zScore : null;
    const zSatisfied =
        typeof userZ === "number" && typeof minZScore === "number" ? userZ >= minZScore : false;

    // -------- compare helpers --------
    const resById = studentResults?.bySubjectId ?? new Map();
    const resByName = studentResults?.bySubjectName ?? new Map();

    const checkCriterion = (crit) => {
        // prefer subjectId, fallback to normalized name
        let userRes =
            (crit.subjectId && resById.get(crit.subjectId)) ||
            (crit.subjectName && resByName.get(normName(crit.subjectName))) ||
            null;

        if (!userRes || !userRes.result) return false;

        // enforce OL/AL match when declared
        const critType = normType(crit.subjectType);
        const userType = normType(userRes.subjectType);
        if (critType && userType && critType !== userType) return false;

        return isGradeSufficient(userRes.result, crit.minGrade);
    };

    const olCriteria = criteria?.ol ?? [];
    const alCriteria = criteria?.al ?? [];

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
        return {
            mandatoryOlPassCount: mandatoryPass,
            mandatoryOlTotal: mandatory.length,
            optionalOlPassCount: optionalPass,
            optionalOlTotal: optional.length,
            olSatisfied: mandatoryPass === mandatory.length && optionalPass >= olMinOpt,
        };
    }, [olCriteria, degreeMeta, resById, resByName]);

    const {
        mandatoryAlPassCount,
        mandatoryAlTotal,
        alPassCount,
        alTotal,
        alSatisfied,
        alMinRequired,
    } = useMemo(() => {
        const mandatory = alCriteria.filter((c) => c.isMandatory);
        const optional = alCriteria.filter((c) => !c.isMandatory);
        const mandatoryPass = mandatory.filter(checkCriterion).length;
        const optPass = optional.filter(checkCriterion).length;
        const alMin = Number.isFinite(degreeMeta?.alCriteriaMinCount)
            ? degreeMeta.alCriteriaMinCount
            : 2;
        return {
            mandatoryAlPassCount: mandatoryPass,
            mandatoryAlTotal: mandatory.length,
            alPassCount: optPass + mandatoryPass,
            alTotal: alCriteria.length,
            alSatisfied: mandatoryPass === mandatory.length && alMin <= optPass + mandatoryPass,
            alMinRequired: alMin,
        };
    }, [alCriteria, degreeMeta, resById, resByName]);

    // -------- loading / error --------
    const anyLoading = isLoading || zLoading || pLoading;
    const anyError = isError || zErr || pErr;

    if (anyLoading) {
        return (
            <View className="mt-5 px-4 items-center">
                <ActivityIndicator />
                <Text style={{ marginTop: 8 }}>Loading criteria…</Text>
            </View>
        );
    }

    if (anyError) {
        return (
            <View className="mt-5 px-4">
                <Text style={{ color: "red" }}>Failed to load criteria / z-score / profile.</Text>
                <Text
                    className="text-blue-600 mt-2"
                    onPress={() => {
                        refetchAll();
                        refetchZ();
                        refetchP();
                    }}
                >
                    Tap to retry
                </Text>
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

                {!!degreeMeta?.alCriteriaDescription && (
                    <Text className="text-sm text-gray-600 italic mt-2">
                        {degreeMeta.alCriteriaDescription}
                    </Text>
                )}

                {alCriteria.length > 0 ? (
                    <>
                        <Text className="text-sm mt-2">
                            Candidate must satisfy <Text className="font-bold">{alMinRequired}</Text> subject(s) in
                            total
                            {mandatoryAlTotal > 0 ? (
                                <>
                                    {" "}
                                    including <Text className="font-bold">{mandatoryAlTotal}</Text> mandatory.
                                </>
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
                            Passed: {alPassCount}/{alTotal} (Mandatory passed: {mandatoryAlPassCount}/
                            {mandatoryAlTotal})
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

                {!!degreeMeta?.olCriteriaDescription && (
                    <Text className="text-sm text-gray-600 italic mt-2">
                        {degreeMeta.olCriteriaDescription}
                    </Text>
                )}

                {olCriteria.length > 0 ? (
                    <>
                        <Text className="text-sm mt-2">
                            All mandatory O/L subjects must be satisfied
                            {Number.isFinite(degreeMeta?.olCriteriaMinCount) && degreeMeta.olCriteriaMinCount > 0 ? (
                                <>
                                    {" "}
                                    and at least <Text className="font-bold">{degreeMeta.olCriteriaMinCount}</Text>{" "}
                                    optional subject(s).
                                </>
                            ) : (
                                "."
                            )}
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
                            Optional passed: {optionalOlPassCount}/{optionalOlTotal} (Mandatory passed:{" "}
                            {mandatoryOlPassCount}/{mandatoryOlTotal})
                        </Text>
                    </>
                ) : (
                    <Text className="text-sm mt-2 text-gray-500">No O/L criteria provided.</Text>
                )}
            </View>

            {/* Z Score */}
            <View className="border border-gray-300 rounded-lg p-4 mt-4">
                <View className="flex-row items-center">
                    <Circle size={16} color="blue" fill="blue" />
                    <Text className="ml-2 text-lg font-bold">Z Score</Text>
                </View>

                {(!yearOptions.length || !locationOptions.length) ? (
                    <Text className="text-sm mt-2 text-gray-500">Z-score data not available for this degree.</Text>
                ) : (
                    <>
                        <View className="mt-2">
                            <CustomDropdown
                                title="Select Year"
                                items={yearOptions}
                                selectedValue={selectedYear}
                                setSelectedValue={setSelectedYear}
                                buttonStyle="flex-row justify-between items-center px-4 py-3 mt-4 mb-1 border border-gray-300 rounded-lg bg-gray-100"
                            />

                            <CustomDropdown
                                title="Select District"
                                items={locationOptions}
                                selectedValue={selectedLocation}
                                setSelectedValue={setSelectedLocation}
                                buttonStyle="flex-row justify-between items-center px-4 py-3 mt-4 mb-1 border border-gray-300 rounded-lg bg-gray-100"
                            />
                        </View>

                        <Text className="mt-4 text-xl font-bold text-blue-600">
                            {typeof userZ === "number" ? userZ : "N/A"}
                        </Text>

                        <View className="flex-row items-center mt-2">
                            {typeof userZ === "number" && typeof minZScore === "number" ? (
                                zSatisfied ? <CheckCircle size={16} color="green" /> : <XCircle size={16} color="red" />
                            ) : (
                                <XCircle size={16} color="gray" />
                            )}
                            <Text className="ml-2 text-sm">
                                {typeof minZScore === "number"
                                    ? `Minimum required Z Score: ${minZScore}`
                                    : "No cutoff Z-score for this year/district."}
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

export default CriteriaScreen;
