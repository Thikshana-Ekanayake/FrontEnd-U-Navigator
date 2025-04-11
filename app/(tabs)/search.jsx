import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Search, Filter } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import ResultItem from "../../components/search/ResultItem";
import AdvancedFilterModal from "../../components/search/AdvancedFilterModal";

import { degreesData } from "../../sampleData/degreeData";
import { universitiesData } from "../../sampleData/universityData";
import {useRouter} from "expo-router";

const combinedData = [...degreesData, ...universitiesData];

const SearchScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const route = useRoute();
    const { initialQuery = "", initialFilter = "All", initialAdvancedFilters = "[]" } = route.params || {};


    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedFilter, setSelectedFilter] = useState(initialFilter);
    const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);


    useEffect(() => {
        setSearchQuery(initialQuery);
        setSelectedFilter(initialFilter);

        try {
            const parsedFilters = JSON.parse(initialAdvancedFilters);
            if (Array.isArray(parsedFilters)) {
                setSelectedFilters(parsedFilters);
            }
        } catch (e) {
            console.warn("Failed to parse advanced filters", e);
        }
    }, [initialQuery, initialFilter, initialAdvancedFilters]);


    const filters = ["All", "Degrees", "Universities"];

    const filteredResults = combinedData.filter((item) => {
        const filterTagMap = {
            All: null,
            Degrees: "degree",
            Universities: "university",
        };

        const tagToMatch = filterTagMap[selectedFilter];

        // 1. Filter by tag
        if (tagToMatch && item.tag !== tagToMatch) return false;

        // 2. Filter by search query
        if (!item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        // 3. Filter by selected advanced filters
        if (selectedFilters.length > 0) {
            const itemValues = Object.values(item).map((val) =>
                typeof val === "string" ? val.toLowerCase() : ""
            );

            const matchesAll = selectedFilters.every((filter) =>
                itemValues.some((val) => val.includes(filter.toLowerCase()))
            );

            if (!matchesAll) return false;
        }

        return true;
    });


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
                />
            </View>

            {/* Filters */}
            <View className="flex-row mt-4 space-x-3">
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
                    <Filter
                        size={16}
                        color={selectedFilters.length > 0 ? "white" : "gray"}
                    />
                </TouchableOpacity>


            </View>

            {/*advanced filter pills*/}
            {selectedFilters.length > 0 && (
                <View className="flex-row flex-wrap mt-2 gap-2">
                    {selectedFilters.map((filter, index) => (
                        <View
                            key={index}
                            className="flex-row items-center px-4 py-2 rounded-3xl bg-blue-600"
                        >
                            <Text className="text-white font-semibold mr-2 text-sm">{filter}</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    setSelectedFilters((prev) =>
                                        prev.filter((item) => item !== filter)
                                    )
                                }
                                className="w-4 h-4 bg-white rounded-full items-center justify-center"
                            >
                                <Text className="text-blue-600 text-xs font-bold">×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}


            {/* Results */}
            <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.id}
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
            />



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
