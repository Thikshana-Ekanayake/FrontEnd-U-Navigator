import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router'
import icons from '../../constants/icons';
import '../../global.css'


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2 pt-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        // className="w-6 h-6"
        style={{ width: 28, height: 28 }}
      />
      {/* <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
     <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#B8B8B8",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#2B8B8B8",
            height: 100,
            paddingTop: 10,
          },
        }}
      >
      <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

degree<Tabs.Screen
          name="degree"
          options={{
            title: "Degree",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.degree}
                color={color}
                name="Degree"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="notification"
          options={{
            title: "Notification",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.notification}
                color={color}
                name="Notification"
                focused={focused}
              />
            ),
          }}
        />

<Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
     </Tabs>
    
    </>
  )
}

export default TabsLayout