import { useRouter } from "expo-router";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Text } from "~/components/ui/text";
import { FIREBASE_AUTH } from "~/firebase-config";
import { UserCircle2 } from "~/lib/icons/UserCircle2";
import { LogOut } from "lucide-react-native";
import { Ticket } from "~/lib/icons/Ticket";
import { ArrowRight } from "~/lib/icons/ArrowRight";
import { CircleHelp } from "~/lib/icons/CircleHelp";

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = async () => {
    await FIREBASE_AUTH.signOut();
    router.replace("/");
  };

  const handleHelp = () => {
    const email =
      "mailto:support@example.com?subject=Ajuda&body=Descreva%20sua%20dúvida%20aqui.";
    Linking.openURL(email).catch((err) =>
      console.error("Erro ao abrir o cliente de e-mail:", err)
    );
  };

  return (
    <ScrollView className="flex-1">
      <View className="bg-primary-foreground p-6 m-4 rounded-md flex flex-row gap-4 border border-border">
        <UserCircle2 className="text-primary opacity-80" size={48} />
        <View>
          <Text className="text-2xl font-bold text-primary opacity-80">
            {user?.email?.split("@")[0]}
          </Text>
          <Text className="text-primary opacity-80">{user?.email}</Text>
        </View>
      </View>

      <View className="mt-6 bg-primary-foreground rounded-lg mx-4 overflow-hidden border border-border">
        <TouchableOpacity
          className="flex-row items-center justify-between p-4 border-b border-border"
          onPress={() => router.navigate("/(tabs)/profile/tickets")}
        >
          <View className="flex-row items-center">
            <Ticket size={24} className="text-primary opacity-80" />
            <Text className="text-primary opacity-80 ml-3 font-semibold">
              Ingressos
            </Text>
          </View>
          <ArrowRight size={20} className="text-primary opacity-80" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between p-4 border-b border-border"
          onPress={handleHelp}
        >
          <View className="flex-row items-center">
            <CircleHelp size={24} className="text-primary opacity-80" />
            <Text className="text-primary ml-3 font-semibold opacity-80">
              Ajuda
            </Text>
          </View>
          <ArrowRight size={20} className="text-primary opacity-80" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between p-4"
          onPress={handleLogout}
        >
          <View className="flex-row items-center">
            <LogOut size={24} color="#EF4444" />
            <Text className="text-red-500 ml-3 font-semibold">Sair</Text>
          </View>
          <ArrowRight size={20} className="text-primary opacity-80" />
        </TouchableOpacity>
      </View>

      <View className="mt-10 bg-primary-foreground rounded-lg mx-4 p-6">
        <Text className="text-lg font-semibold mb-2 text-primary">
          Sobre nós
        </Text>
        <Text className="text-primary opacity-80 text-justify">
          O Ingresso Fácil é uma plataforma de distribuição de ingressos para
          cinemas que visa disponibilizar ingressos de forma gratuita para os
          usuários.
        </Text>
      </View>

      <View className="mt-6 mb-4 items-center">
        <Text className="text-primary opacity-80 text-sm">
          Copyright © 2024 Ingresso Fácil
        </Text>
      </View>
    </ScrollView>
  );
}
