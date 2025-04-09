import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { ChevronDown, Check } from "lucide-react-native";

const CustomDropdown = ({
                          items,
                          title,
                          selectedValue,
                          setSelectedValue,
                          buttonStyle = "flex-row justify-between items-center px-4 py-5 mt-4 mb-1 border border-gray-300 rounded-lg bg-gray-100",
                          textStyle = "text-gray-400",
                          modalContainerStyle = "flex-1 justify-end bg-black bg-opacity-10 backdrop-blur-lg",
                          modalStyle = "h-[90vh] bg-white rounded-t-2xl p-5",
                          optionTextStyle = "text-gray-700",
                        }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

  const handleSelect = (item) => {
    setSelectedValue(item.value);
    setOpen(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredItems(
        items.filter((item) =>
            item.label.toLowerCase().includes(text.toLowerCase())
        )
    );
  };

  return (
      <View>
        {/* Trigger Button */}
        <TouchableOpacity onPress={() => setOpen(true)} className={buttonStyle}>
          <Text className={textStyle}>
            {selectedValue
                ? items.find((i) => i.value === selectedValue)?.label
                : title}
          </Text>
          <ChevronDown size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Modal Dropdown */}
        <Modal visible={open} animationType="slide" transparent>
          <View className={modalContainerStyle}>
            <View className={modalStyle}>
              {/* Header */}
              <View className="flex-row justify-between items-center pb-3 border-b border-gray-300">
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Text className="text-blue-500 text-lg">Cancel</Text>
                </TouchableOpacity>
                <Text className="text-lg font-semibold">{title}</Text>
                <TouchableOpacity>
                  <Text className="text-blue-500 text-lg">Edit</Text>
                </TouchableOpacity>
              </View>

              {/* Search Bar */}
              <View className="bg-gray-100 px-3 py-2 rounded-lg flex-row items-center mt-3 mb-3">
                <TextInput
                    placeholder="Search"
                    value={search}
                    onChangeText={handleSearch}
                    className="flex-1 text-base"
                />
              </View>

              {/* List of Options */}
              <FlatList
                  data={filteredItems}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          onPress={() => handleSelect(item)}
                          className="flex-row justify-between p-4 border-b border-gray-200"
                      >
                        <Text className={optionTextStyle}>{item.label}</Text>
                        {selectedValue === item.value && (
                            <Check size={18} color="#007AFF" />
                        )}
                      </TouchableOpacity>
                  )}
              />
            </View>
          </View>
        </Modal>
      </View>
  );
};

export default CustomDropdown;
