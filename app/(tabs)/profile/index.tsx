import { router, Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { FIREBASE_AUTH } from "~/firebase-config";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <TouchableOpacity
        className="bg-red-500 rounded-lg p-4 mt-4 justify-center items-center"
        onPress={async () => {
          try {
            await FIREBASE_AUTH.signOut();
            router.navigate("/");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Text className="text-white border-l-0">Sair</Text>
      </TouchableOpacity>
    </>
  );
}
