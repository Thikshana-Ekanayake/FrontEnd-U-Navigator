import React from "react";
import { FlatList } from "react-native";
import ResultItem from "../../../../../components/search/ResultItem";

const InterestedDegrees = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ResultItem item={item} />}
        />
    );
};

export default InterestedDegrees;
