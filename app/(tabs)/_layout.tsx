import { Tabs } from "expo-router";
import { Film, User2Icon } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="movies"
        options={{
          title: "Filmes",
          tabBarIcon: ({ color }) => <Film size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Meu Perfil",
          tabBarIcon: ({ color }) => <User2Icon size={28} color={color} />,
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
