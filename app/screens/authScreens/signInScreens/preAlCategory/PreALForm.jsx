// screens/PreALForm.js
import React from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../../components/CustomInput';

const PreALForm = ({ formData, setFormData }) => {
    return (
        <View>
            <CustomInput
                placeholder="Current Grade"
                value={formData.PreAL.grade}
                onChangeText={(text) =>
                    setFormData({
                        ...formData,
                        PreAL: { ...formData.PreAL, grade: text },
                    })
                }
            />
            <CustomInput
                placeholder="School Name"
                value={formData.PreAL.school}
                onChangeText={(text) =>
                    setFormData({
                        ...formData,
                        PreAL: { ...formData.PreAL, school: text },
                    })
                }
            />
        </View>
    );
};

export default PreALForm;
