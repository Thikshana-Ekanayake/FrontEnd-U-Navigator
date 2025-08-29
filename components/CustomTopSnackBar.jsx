import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info,
} from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const variantStyles = {
    success: { backgroundColor: '#4BB543', icon: CheckCircle },
    error: { backgroundColor: '#FF3B30', icon: XCircle },
    warning: { backgroundColor: '#FF9500', icon: AlertTriangle },
    info: { backgroundColor: '#007AFF', icon: Info },
};

const TopSnackbar = ({
                         visible,
                         message,
                         variant = 'info',
                         duration = 3000,
                         icon: CustomIcon,
                         onClose = () => {},
                     }) => {
    const translateY = useRef(new Animated.Value(-100)).current;

    const { backgroundColor, icon: DefaultIcon } = variantStyles[variant] || variantStyles.info;
    const IconComponent = CustomIcon || DefaultIcon;

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(translateY, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                }).start(onClose);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor, transform: [{ translateY }] },
            ]}
        >
            <IconComponent color="white" size={20} style={{ marginRight: 8 }} />
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        zIndex: 999,
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    message: {
        color: 'white',
        fontSize: 15,
        flexShrink: 1,
    },
});

export default TopSnackbar;
