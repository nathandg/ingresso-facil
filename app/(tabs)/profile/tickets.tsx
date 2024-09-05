import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Ticket } from "~/lib/icons/Ticket";
import { FilmIcon } from "~/lib/icons/FilmIcon";
import { Users2 } from "~/lib/icons/Users2";
import { CalendarIcon } from "~/lib/icons/CalendarIcon";
import { ChevronRightIcon } from "~/lib/icons/ChevronRightIcon";
import { useRouter } from "expo-router";
import { User } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "~/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function TicketsScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUser(currentUser);
      const fetchTickets = async () => {
        try {
          const ticketsRef = collection(FIREBASE_DB, "tickets");
          const q = query(ticketsRef, where("userId", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);

          const fetchedTickets = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTickets(fetchedTickets);
        } catch (error) {
          console.error("Error fetching tickets: ", error);
        }
      };

      fetchTickets();
    }
  }, [user]);

  const renderTicket = (ticket: any) => {
    return (
      <TouchableOpacity
        key={ticket.id}
        className="bg-primary-foreground rounded-lg overflow-hidden my-3 mx-1 border border-border"
        onPress={() => {
          router.navigate({
            pathname: "/(tabs)/profile/ticket",
            params: {
              idMovie: ticket.movieId,
              date: ticket.date,
              time: ticket.time,
              cinema: ticket.cinema,
              room: ticket.room,
              seats: ticket.seats,
            },
          });
        }}
      >
        <View className="p-4 border-b border-border">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FilmIcon className="text-primary opacity-80" size={24} />
              <Text className="text-lg font-semibold text-secondary-foreground ml-2 opacity-80">
                {ticket.movie}
              </Text>
            </View>
            <ChevronRightIcon size={20} className="text-primary opacity-80" />
          </View>
        </View>

        <View className="p-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <CalendarIcon className="text-primary opacity-80" size={20} />
            <Text className="text-secondary-foreground ml-2">
              {ticket.date}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Users2 className="text-primary opacity-80" size={20} />
            <Text className="text-secondary-foreground ml-2 opacity-80">
              {ticket.seats}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 mt-1 mx-4 space-y-4">
      <View className="p-4 border-b border-border">
        <View className="flex-row items-center gap-2">
          <Ticket className="text-foreground" size={30} />
          <Text className="text-xl font-semibold text-foreground ml-2">
            Ingressos
          </Text>
        </View>
      </View>

      <FlatList
        data={tickets}
        renderItem={({ item }) => renderTicket(item)}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
