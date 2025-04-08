// screens/ConsultantForm.js
import React from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../../components/CustomInput';

const ConsultantForm = ({ formData, setFormData }) => {
    return (
        <View>
            <CustomInput
                placeholder="Employee ID"
                value={formData.Admin.employeeID}
                onChangeText={(text) =>
                    setFormData({
                        ...formData,
                        Admin: { ...formData.Admin, employeeID: text },
                    })
                }
            />
            <CustomInput
                placeholder="Role"
                value={formData.Admin.role}
                onChangeText={(text) =>
                    setFormData({
                        ...formData,
                        Admin: { ...formData.Admin, role: text },
                    })
                }
            />
        </View>
    );
};

export default ConsultantForm;
