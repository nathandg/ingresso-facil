import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { ActivityIndicator, ImageBackground, View, Image } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { FIREBASE_AUTH } from "~/firebase-config";

export default function SignUpScreen() {
  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="min-h-screen flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Image
            source={require("~/assets/images/logo.png")}
            className="w-36 h-36 mx-auto mb-6"
          />
          <CardTitle className="text-2xl font-bold mb-3 text-center">
            Registrar
          </CardTitle>
          <CardDescription className="text-center text-md">
            Insira suas informações para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 gap-5">
          <Input
            placeholder="email@ingresso.com"
            value={emailAddress}
            keyboardType="email-address"
            onChangeText={setEmailAddress}
            aria-labelledby="emailLabel"
            autoCapitalize="none"
            autoComplete="email"
          />
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            aria-labelledby="passwordLabel"
            autoCapitalize="none"
            autoComplete="password"
          />
          <Input
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
          <Button className="w-full" variant="default" onPress={onSignUpPress}>
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
  );
}
