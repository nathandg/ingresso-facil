import {
  Calendar,
  ClapperboardIcon,
  Clock,
  MapPin,
  Users2,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";

interface Ticket {
  movie: string;
  gender: string;
  date: string;
  time: string;
  room: string;
  cinema: string;
  seats: number;
}

export default function GetTicketScreen() {
  const [ticket, setTicket] = useState<Ticket>();
  const [movie, setMovie] = useState<any>();
  const { idMovie, date, time, cinema, room, seats } = useLocalSearchParams();

  useEffect(() => {
    let foundMovie = null;
    if (idMovie) {
      foundMovie = [...MoviesDisplay, ...MoviesComingSoon].find(
        (movie) => movie.id === Number(idMovie)
      );
      setMovie(foundMovie || null);
    }

    const ticker = {
      movie: foundMovie?.title || "",
      gender: foundMovie?.genre || "",
      date: Array.isArray(date) ? date[0] : date || "",
      time: Array.isArray(time) ? time[0] : time || "",
      cinema: Array.isArray(cinema) ? cinema[0] : cinema || "",
      room: Array.isArray(room) ? room[0] : room || "",
      seats: Array.isArray(seats) ? Number(seats[0]) : Number(seats) || 1,
    };

    setTicket(ticker);

    console.log(ticker);
  }, [idMovie]);

  return (
    <View className="flex-1 flex-col justify-between h-full">
      <View className="relative h-52 bg-gray-300">
        <View className="bg-black">
          <Image
            src={movie?.cover}
            className="w-full h-full object-cover opacity-50"
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <Text className="text-2xl font-bold text-white">{ticket?.movie}</Text>
          <Badge variant="secondary" className="mt-2 w-fit">
            <Text className="text-lg">{ticket?.gender}</Text>
          </Badge>
        </View>
      </View>

      <View className="flex-col justify-evenly flex-1">
        <View className="flex justify-around items-center flex-row">
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

        <View className="flex-col gap-6 justify-center items-center">
          <View className="flex-row gap-2 items-center">
            <QRCode size={150} value={JSON.stringify(ticket)} />
          </View>

          <View className="flex-row gap-2 items-center">
            <Users2 size={24} color={"#000"} />
            <Text className="text-lg font-semibold text-primary">
              {ticket?.seats}
            </Text>
          </View>

          <Text className="text-base text-center text-muted-foreground">
            Escaneie o QR code acima para validar seu ingresso
          </Text>
        </View>
      </View>
    </View>
  );
}
