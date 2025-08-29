import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({
                        title,
                        onPress,
                        isLoading = false,
                        disabled = false, // new prop
                        containerStyles = {},
                        textStyles = {}
                      }) => {
  const isButtonDisabled = isLoading || disabled;

  return (
      <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          disabled={isButtonDisabled}
          style={[
            styles.button,
            containerStyles,
            isButtonDisabled && styles.disabled
          ]}
      >
        <LinearGradient
            colors={['#0047B2', '#25A8F5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, isButtonDisabled && styles.disabledGradient]}
        >
          <Text style={[styles.text, textStyles]}>{title}</Text>

          {isLoading && (
              <View style={{ marginLeft: 8 }}>
                <ActivityIndicator animating={true} color="#fff" size="small" />
              </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledGradient: {
    // Optional: override gradient colors if you want a gray tone instead of opacity
    backgroundColor: '#A9A9A9', // fallback background
  },
});

export default CustomButton;
