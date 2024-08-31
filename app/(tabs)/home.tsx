import * as React from "react";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Info } from "lucide-react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Redirect, router } from "expo-router";
import { FIREBASE_AUTH } from "~/firebase-config";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text>{`Logado com: ${FIREBASE_AUTH.currentUser?.email}`}</Text>
      <Button
        variant="outline"
        onPress={() => {
          FIREBASE_AUTH.signOut();
          router.navigate("/");
        }}
      >
        <Text>Sair</Text>
      </Button>
    </View>
  );
}
