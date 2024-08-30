import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "~/components/ui/text";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "~/firebase-config";

export default function SignUpScreen() {
  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [theme, setColorScheme] = React.useState("light");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getTheme = async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (theme === "dark") {
        setColorScheme("dark");
      } else {
        setColorScheme("light");
      }
    };
    getTheme();
  }, []);

  const onSignUpPress = React.useCallback(async () => {
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      if (user) router.replace("/(tabs)/movies");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [emailAddress, password]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View>
      <View className="min-h-screen flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold mb-3 text-center">
              Registrar
            </CardTitle>
            <CardDescription className="text-center text-md">
              Insira suas informações para criar uma conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 gap-5">
            <Input
              className={theme === "dark" ? "color-white" : ""}
              placeholder="email@ingresso.com"
              value={emailAddress}
              keyboardType="email-address"
              onChangeText={setEmailAddress}
              aria-labelledby="emailLabel"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              className={theme === "dark" ? "color-white" : ""}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              aria-labelledby="passwordLabel"
              autoCapitalize="none"
              autoComplete="password"
            />
            <Input
              className={theme === "dark" ? "color-white" : ""}
              placeholder="Repetir Senha"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry
              aria-labelledby="repeatPasswordLabel"
              autoCapitalize="none"
              autoComplete="password"
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mx-2 gap-4">
            <Button
              className="w-full"
              variant="default"
              onPress={onSignUpPress}
            >
              <Text>Registrar</Text>
            </Button>
            <Button
              className="w-full"
              variant="link"
              onPress={() => router.back()}
            >
              <Text>Já possui uma conta? Entrar</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </View>
  );
}
