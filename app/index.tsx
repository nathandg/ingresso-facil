import { Link, useRouter } from "expo-router";
import { View, ImageBackground, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { Text } from "~/components/ui/text";
import { FIREBASE_AUTH } from "~/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Page() {
  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [theme, setColorScheme] = React.useState("light");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            console.log("User is signed in", user);
            router.replace("/(tabs)/home");
          }
          setLoading(false);
        });
      } catch (error) {
        console.error("Error checking auth state:", error);
        setLoading(false);
      }
    };

    checkAuthState();
  }, [auth, router]);

  useEffect(() => {
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

  const onSignInPress = React.useCallback(async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      if (user) router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [auth, emailAddress, password]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ImageBackground
      className="m-2"
      source={require("~/assets/images/logo.png")}
    >
      <View className="min-h-screen flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold mb-3 text-center">
              Entrar
            </CardTitle>
            <CardDescription className="text-center text-md">
              Insira suas credencias do Ingresso Fácil para continuar
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
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              aria-labelledby="passwordLabel"
              autoCapitalize="none"
              autoComplete="password"
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mx-2 gap-4">
            <Button
              className="w-full"
              variant="default"
              onPress={onSignInPress}
            >
              <Text>Acessar</Text>
            </Button>
            <Button
              className="w-full"
              variant="link"
              onPress={() => router.push("/sign-up")}
            >
              <Text>Não tem uma conta? Registre-se</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </ImageBackground>
  );
}
