import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { TicketIcon } from '~/lib/icons/TicketIcon';
import { FilmIcon } from '~/lib/icons/FilmIcon';
import { Users2 } from '~/lib/icons/Users2';
import { CalendarIcon } from '~/lib/icons/CalendarIcon';
import { ChevronRightIcon } from 'lucide-react-native';

const tickets = [
  { id: 1, movie: "Inception", date: "2023-07-15", seats: 2 },
  { id: 2, movie: "The Dark Knight", date: "2023-07-20", seats: 3 },
  { id: 3, movie: "Interstellar", date: "2023-07-25", seats: 1 },
  { id: 4, movie: "Dunkirk", date: "2023-08-01", seats: 4 },
  { id: 5, movie: "Tenet", date: "2023-08-05", seats: 2 },
]

export default function Component() {

  const renderTicket = (ticket: any) => {
    return (
      <TouchableOpacity 
        key={ticket.id} 
        className="bg-secondary rounded-lg overflow-hidden shadow-sm my-3 mx-1 b"
      >
        <View className="p-4 border-b border-primary-foreground">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <FilmIcon className='text-secondary-foreground' size={24} />
              <Text className="text-lg font-semibold text-secondary-foreground ml-2">{ticket.movie}</Text>
            </View>
            <ChevronRightIcon size={20} color="#9CA3AF" />
          </View>
        </View>

        <View className="p-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <CalendarIcon className="text-secondary-foreground" size={20} />
            <Text className="text-secondary-foreground ml-2">{ticket.date}</Text>
          </View>
          <View className="flex-row items-center">
            <Users2 className="text-secondary-foreground" size={20} />
            <Text className="text-secondary-foreground ml-2">{ticket.seats}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View className="flex-1 mt-1 mx-4 space-y-4">
      <View className="p-4 border-b border-gray-200">
        <View className="flex-row items-center gap-2">
          <TicketIcon className='text-foreground' size={30} />
          <Text className="text-xl font-semibold text-foreground ml-2">Meus Ingressos</Text>
        </View>
      </View>

      <FlatList 
        data={tickets}
        renderItem={({ item }) => renderTicket(item)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}