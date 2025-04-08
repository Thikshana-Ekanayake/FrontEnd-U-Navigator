import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../../components/CustomInput';

const PreALForm = ({ onDataChange, defaultData = {} }) => {
    const [data, setData] = useState({
        grade: defaultData.grade || '',
        school: defaultData.school || '',
    });

    useEffect(() => {
        onDataChange(data);
    }, [data]);

    return (
        <View>
            <CustomInput
                placeholder="Current Grade"
                value={data.grade}
                onChangeText={(text) =>
                    setData((prev) => ({ ...prev, grade: text }))
                }
            />
            <CustomInput
                placeholder="School Name"
                value={data.school}
                onChangeText={(text) =>
                    setData((prev) => ({ ...prev, school: text }))
                }
            />
        </View>
    );
};

export default PreALForm;
