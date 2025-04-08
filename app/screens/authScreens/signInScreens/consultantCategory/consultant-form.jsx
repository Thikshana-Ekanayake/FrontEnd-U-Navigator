import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../../components/CustomInput';

const ConsultantForm = ({ onDataChange, defaultData = {} }) => {
    const [data, setData] = useState({
        employeeID: defaultData.employeeID || '',
        role: defaultData.role || '',
    });

    useEffect(() => {
        onDataChange(data);
    }, [data]);

    return (
        <View>
            <CustomInput
                placeholder="Employee ID"
                value={data.employeeID}
                onChangeText={(text) =>
                    setData((prev) => ({ ...prev, employeeID: text }))
                }
            />
            <CustomInput
                placeholder="Role"
                value={data.role}
                onChangeText={(text) =>
                    setData((prev) => ({ ...prev, role: text }))
                }
            />
        </View>
    );
};

export default ConsultantForm;
