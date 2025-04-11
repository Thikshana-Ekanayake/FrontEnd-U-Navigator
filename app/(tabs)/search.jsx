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
    const { initialQuery = "", initialFilter = "All" } = route.params || {};

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedFilter, setSelectedFilter] = useState(initialFilter);
    const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

    useEffect(() => {
        setSearchQuery(initialQuery);
        setSelectedFilter(initialFilter);
    }, [initialQuery, initialFilter]);

    const filters = ["All", "Degrees", "Universities"];

    const filteredResults = combinedData.filter((item) => {
        const filterTagMap = {
            All: null,
            Degrees: "degree",
            Universities: "university",
        };
        const tagToMatch = filterTagMap[selectedFilter];

        return (
            (!tagToMatch || item.tag === tagToMatch) &&
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
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
                    className="px-4 py-2 rounded-3xl border border-gray-400 absolute right-0"
                    onPress={() => setShowAdvancedFilter(true)}
                >
                    <Filter size={16} color="gray" />
                </TouchableOpacity>

            </View>

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
            />
        </SafeAreaView>
    );
};

export default SearchScreen;
