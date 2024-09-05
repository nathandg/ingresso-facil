import { Calendar, ClapperboardIcon, Clock, MapPin, Users2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Linking, ScrollView, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

interface Ticket {
  movie: string
  gender: string
  date: string
  time: string
  room: string
  cinema: string
  seats: number
}

export default function TicketScreen() {

  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    setTicket({
      movie: "Thor: Amor e Trovão",
      gender: "Ação / Aventura",
      date: "21-07-2024",
      time: "20:00",
      room: "Sala 1",
      cinema: "Cine Araújo - Londrina",
      seats: 2,
    })
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card className="max-w-md mx-1">
        <View className="relative h-52 bg-gray-300">
          <View className="bg-black">
            <Image src="https://uploads.jovemnerd.com.br/wp-content/uploads/2022/07/thor_amor_e_trovao_capa__qu0m4x6.jpg" className="w-full h-full object-cover opacity-50"/>
          </View>
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <Text className="text-2xl font-bold text-white">{ticket?.movie}</Text>
            <Badge variant="secondary" className="mt-2 w-fit">
              <Text className="text-lg">{ticket?.gender}</Text>
            </Badge>
          </View>
        </View>

        <CardContent className="flex-col gap-10 p-6 space-y-4 my-4">
          <View className="flex justify-between items-center flex-row">
            <View className="flex-col gap-4">
              <View className="flex-row gap-2 items-center">
                <Calendar size={24} color={"#000"} />
                <Text className="text-base">{ticket?.date}</Text>
              </View>

              <View className="flex-row gap-2 items-center">
                <ClapperboardIcon size={24} color={"#000"} />
                <Text className="text-sm font-medium">{ticket?.room}</Text>
              </View>
            </View>
            
            <View className="flex-col gap-4">            
              <View className="flex-row gap-2 items-center">
                <Clock size={24} color={"#000"} />
                <Text className="text-base">{ticket?.time}</Text>
              </View>
              
              <View className="flex-row gap-2 items-center">
                <MapPin size={24} color={"#000"} />
                <Text className="text-base">{ticket?.cinema}</Text>
              </View>
            </View>
          </View>

          <View className="flex justify-center items-center">
            <QRCode size={150} value={JSON.stringify(ticket)} />
          </View>

          <View className="flex-row items-center w-full justify-center">
              <Users2 className="text-secondary-foreground" size={20} />
              <Text className="text-secondary-foreground ml-2">{ticket?.seats}</Text>
          </View>        
          
          <Text className="text-base text-center text-muted-foreground">
            Escaneie o QR code acima para validar seu ingresso
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  )
}