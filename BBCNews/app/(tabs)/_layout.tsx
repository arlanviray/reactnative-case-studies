import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#FF6347",
        headerStyle: {
          backgroundColor: "#B80200",
        },
        headerShadowVisible: false,
        headerTintColor: "#FFF",
        tabBarStyle: {
          backgroundColor: "#B80200",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "News",
          headerTitle: "BBC News",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="newspaper" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="business"
        options={{
          title: "Business",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="business" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="technology"
        options={{
          title: "Tech",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="biotech" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: "Health",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="health-and-safety" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="science"
        options={{
          title: "Science",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="science" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sport"
        options={{
          title: "Sport",
          headerTitle: "BBC News - Sport",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="sports-football" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
