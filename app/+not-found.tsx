import { Link, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text } from "~/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <MaterialIcons name="error-outline" size={80} color="#EF4444" />
        <Text style={styles.title}>Página não encontrada</Text>
        <Text style={styles.message}>
          Desculpe, a página que você está procurando não existe.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Voltar para a tela inicial</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  link: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  linkText: {
    color: "white",
    fontSize: 16,
  },
});
