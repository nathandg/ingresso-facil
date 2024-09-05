import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Ticket } from "~/lib/icons/Ticket";
import { FilmIcon } from "~/lib/icons/FilmIcon";
import { Users2 } from "~/lib/icons/Users2";
import { CalendarIcon } from "~/lib/icons/CalendarIcon";
import { ChevronRightIcon } from "~/lib/icons/ChevronRightIcon";

const tickets = [
  { id: 1, movie: "Inception", date: "2023-07-15", seats: 2 },
  { id: 2, movie: "The Dark Knight", date: "2023-07-20", seats: 3 },
  { id: 3, movie: "Interstellar", date: "2023-07-25", seats: 1 },
  { id: 4, movie: "Dunkirk", date: "2023-08-01", seats: 4 },
  { id: 5, movie: "Tenet", date: "2023-08-05", seats: 2 },
];

export default function Component() {
  const renderTicket = (ticket: any) => {
    return (
      <TouchableOpacity
        key={ticket.id}
        className="bg-primary-foreground rounded-lg overflow-hidden shadow-sm my-3 mx-1 b"
      >
        <View className="p-4 border border-secondary">
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

        <View className="p-4 flex-row border border-secondary justify-between items-center">
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
      <View className="p-4 border-b border-secondary">
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
