import { useEffect, useRef } from 'react';
import { View, ScrollView, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images';
// import '../global.css';

export default function LogoScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start from 0 opacity

  useEffect(() => {
    // Fade in the logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second fade-in
      useNativeDriver: true,
    }).start();

    // Fade out and navigate after 2 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 0.5 second fade-out
        useNativeDriver: true,
      }).start(() => {
        router.replace('/sign-in'); // Navigate after fade-out
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, router]);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Animated.Image 
            source={images.logo} 
            style={{ opacity: fadeAnim, width: 350, height: 350 }} // Adjust size as needed
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
