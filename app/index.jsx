import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import "../global.css";
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images';



export default function App() {
  return (
    <SafeAreaView className = "bg-white h-full">
      <ScrollView contentContainerStyle={{ height:'100%'}} >
        <View className='w-full justify-center items-center h-full px-4'>
          <Image 
            source = {images.logo}
          />

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}
