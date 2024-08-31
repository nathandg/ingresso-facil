import { useRouter } from 'expo-router';
import { User } from 'firebase/auth'
import { ArrowRight, LogOut, Ticket, UserCircle2Icon } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from '~/components/ui/text';
import { FIREBASE_AUTH } from '~/firebase-config';

export default function Component() {

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
    router.replace('/');
  }

  return (
      <ScrollView className="flex-1">
        <View className="bg-primary p-6 m-4 rounded-md flex flex-row gap-4">
          <UserCircle2Icon className='text-primary-foreground' size={48} />
          <View>
            <Text className="text-2xl font-bold text-primary-foreground">{user?.email?.split('@')[0]}</Text>
            <Text className="text-primary-foreground opacity-80">{user?.email}</Text>
          </View>
        </View>

        <View className="mt-6 bg-white rounded-lg mx-4 overflow-hidden">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <Ticket size={24} color="#4B5563" />
              <Text className="text-gray-800 ml-3 font-semibold">Meus ingressos</Text>
            </View>
            <ArrowRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between p-4" onPress={handleLogout}>
            <View className="flex-row items-center">
              <LogOut size={24} color="#EF4444" />
              <Text className="text-red-500 ml-3 font-semibold">Sair</Text>
            </View>
            <ArrowRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View className="mt-6 bg-white rounded-lg mx-4 p-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">Sobre nós</Text>
          <Text className="text-gray-600 text-justify">
            O Ingresso Fácil é uma plataforma de distribuição de ingressos para cinemas que visa disponibilizar ingressos de forma gratuita para os usuários.
          </Text>
        </View>

        <View className="mt-6 mb-4 items-center">
          <Text className="text-gray-500 text-sm">
            Copyright © 2024 Ingresso Fácil
          </Text>
        </View>
      </ScrollView>
  )
}