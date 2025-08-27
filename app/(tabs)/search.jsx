import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Search, Filter } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

import ResultItem from "../../components/search/ResultItem";
import AdvancedFilterModal from "../../components/search/AdvancedFilterModal";

// LIVE hooks (make sure these files exist from previous step)
import { useUniversities} from "../../src/quaryHooks/universities/useUniversities";
import { useDegrees} from "../../src/quaryHooks/degrees/useDegrees";

const filters = ["All", "Degrees", "Universities"];

const SearchScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const route = useRoute();

    const { initialQuery = "", initialFilter = "All", initialAdvancedFilters = "[]" } = route.params || {};

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedFilter, setSelectedFilter] = useState(initialFilter);
    const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Fetch from backend
    const {
        data: universities = [],
        isLoading: uniLoading,
        error: uniError,
        refetch: refetchUnis,
    } = useUniversities();

    const {
        data: degrees = [],
        isLoading: degLoading,
        error: degError,
        refetch: refetchDegrees,
    } = useDegrees();

    useEffect(() => {
        setSearchQuery(initialQuery);
        setSelectedFilter(initialFilter);
        try {
            const parsed = JSON.parse(initialAdvancedFilters);
            if (Array.isArray(parsed)) setSelectedFilters(parsed);
        } catch (e) {
            console.warn("Failed to parse advanced filters", e);
        }
    }, [initialQuery, initialFilter, initialAdvancedFilters]);

    // Normalize backend DTOs -> items compatible with your ResultItem/filtering
    const combinedData = useMemo(() => {
        const uniItems = universities.map((u) => ({
            id: u.id,
            tag: "university",
            title: u.name,
            subtitle: u.address || u.website || "",
            description: u.description || "",
            icon: u.logoUrl,
            image:u.imageUrl,
            // include more fields to help advanced filters match
            address: u.address || "",
            website: u.website || "",
            contactEmail: u.contact?.email || "",
            contactPhone: u.contact?.phone || "",
            locationUrl: u.locationUrl || "",
            createdAt: u.createdAt || "",
            updatedAt: u.updatedAt || "",
        }));

        const degreeItems = degrees.map((d) => ({
            id: d.id,
            tag: "degree",
            title: d.name,
            subtitle: d.universityName || d.degreeType || "",
            description: d.description || "",
            imageUrl: d.imageUrl || "",
            image: d.imageUrl,
            // include fields for advanced filter pills
            universityName: d.universityName || "",
            uniCode: d.uniCode || "",
            degreeType: d.degreeType || "",
            duration: d.duration || "",
            streams: Array.isArray(d.streams) ? d.streams.join(", ") : "",
            olCriteriaDescription: d.olCriteriaDescription || "",
            alCriteriaDescription: d.alCriteriaDescription || "",
        }));

        return [...degreeItems, ...uniItems];
    }, [universities, degrees]);

    // Apply UI filters (tag, search, advanced)
    const filteredResults = useMemo(() => {
        const filterTagMap = { All: null, Degrees: "degree", Universities: "university" };
        const tagToMatch = filterTagMap[selectedFilter];

        return combinedData.filter((item) => {
            if (tagToMatch && item.tag !== tagToMatch) return false;

            if (searchQuery?.trim()) {
                const q = searchQuery.trim().toLowerCase();
                // Prioritize title but also allow subtitle/description
                const hay = [
                    item.title,
                    item.subtitle,
                    item.description,
                    item.universityName,
                    item.uniCode,
                    item.degreeType,
                    item.streams,
                    item.address,
                    item.website,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!hay.includes(q)) return false;
            }

            if (selectedFilters.length > 0) {
                // Check each selected pill against any string value of the item
                const values = Object.values(item)
                    .flatMap((v) => (typeof v === "string" ? [v.toLowerCase()] : []));
                const matchesAll = selectedFilters.every((pill) =>
                    values.some((v) => v.includes(String(pill).toLowerCase()))
                );
                if (!matchesAll) return false;
            }

            return true;
        });
    }, [combinedData, searchQuery, selectedFilter, selectedFilters]);

    const isLoading = uniLoading || degLoading;
    const hasError = uniError || degError;

    return (
        <SafeAreaView className="flex-1 bg-white px-4 pt-6">
            {/* Search Bar */}
            <View className="flex-row items-center bg-gray-100 rounded-3xl px-4 py-3">
                <Search size={20} color="gray" />
                <TextInput
                    placeholder="Search Degrees or Universities"
                    className="flex-1 ml-3 text-base"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                />
            </View>

            {/* Filters */}
            <View className="flex-row mt-4 space-x-3 mb-2">
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        onPress={() => setSelectedFilter(filter)}
                        className={`px-4 mr-3 py-2 rounded-3xl border ${
                            selectedFilter === filter ? "border-text" : "border-smoke"
                        }`}
                    >
                        <Text
                            className={`text-sm font-semibold ${
                                selectedFilter === filter ? "text-text" : "text-smoke"
                            }`}
                        >
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    className={`px-4 py-2 rounded-3xl border absolute right-0 ${
                        selectedFilters.length > 0 ? "bg-blue-600 border-blue-600" : "border-gray-400"
                    }`}
                    onPress={() => setShowAdvancedFilter(true)}
                >
                    <Filter size={16} color={selectedFilters.length > 0 ? "white" : "gray"} />
                </TouchableOpacity>
            </View>

            {/* Advanced filter pills */}
            {selectedFilters.length > 0 && (
                <View className="flex-row flex-wrap mt-2 gap-2">
                    {selectedFilters.map((filter, index) => (
                        <View key={index} className="flex-row items-center px-4 py-2 rounded-3xl bg-blue-600">
                            <Text className="text-white font-semibold mr-2 text-sm">{filter}</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    setSelectedFilters((prev) => prev.filter((item) => item !== filter))
                                }
                                className="w-4 h-4 bg-white rounded-full items-center justify-center"
                            >
                                <Text className="text-blue-600 text-xs font-bold">×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            {/* Loading / Error */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator />
                    <Text style={{ marginTop: 8 }}>Loading results…</Text>
                </View>
            ) : hasError ? (
                <View className="flex-1 items-center justify-center">
                    <Text style={{ color: "red", textAlign: "center" }}>
                        Failed to fetch results. Pull to refresh or try again.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredResults}
                    keyExtractor={(item) => item.id}
                    onRefresh={() => {
                        refetchUnis();
                        refetchDegrees();
                    }}
                    refreshing={isLoading}
                    renderItem={({ item }) => (
                        <ResultItem
                            item={item}
                            onPress={() =>
                                navigation.navigate(
                                    item.tag === "degree"
                                        ? "screens/degree/degree-detail"
                                        : "screens/university/university-detail",
                                    { id: item.id }
                                )
                            }
                        />
                    )}
                    ListEmptyComponent={
                        <View className="py-16 items-center">
                            <Text className="text-gray-500">No results match your filters.</Text>
                        </View>
                    }
                />
            )}

            <AdvancedFilterModal
                visible={showAdvancedFilter}
                onClose={() => setShowAdvancedFilter(false)}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
        </SafeAreaView>
    );
};

export default SearchScreen;
