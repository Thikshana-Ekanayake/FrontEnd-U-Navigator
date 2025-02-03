import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropdown = ({ items, selectedValue, setSelectedValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={selectedValue}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedValue}
      placeholder="Select Category"
      style={{
        backgroundColor: '#F3F4F6',
        borderColor: '#D1D5DB',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 15,
        height: 60,
      }}
      dropDownContainerStyle={{
        backgroundColor: '#fff',
        borderColor: '#D1D5DB',
      }}
      tickIconStyle={{
        tintColor: '#22C55E', // Green tick color
        width: 24,
        height: 24,
      }}
    />
  );
};

export default CustomDropdown;