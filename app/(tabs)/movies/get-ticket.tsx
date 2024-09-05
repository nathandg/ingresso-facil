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
import { TouchableOpacity } from "react-native";
import { Minus } from "~/lib/icons/Minus";
import { Plus } from "~/lib/icons/Plus";
import { router, useLocalSearchParams } from "expo-router";
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "~/firebase-config";

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
  const { idMovie, date, time, cinema, room } = useLocalSearchParams();

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
      seats: 1,
    };

    setTicket(ticker);

    console.log(ticker);
  }, [idMovie]);

  const [seats, setSeats] = useState(ticket?.seats || 1);

  const incrementSeats = () => {
    if (seats < 10) {
      setSeats(seats + 1);
    }
  };

  const decrementSeats = () => {
    if (seats > 1) {
      setSeats(seats - 1);
    }
  };

  const confirmSeats = async () => {
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }

    const ticketData = {
      movie: ticket?.movie,
      gender: ticket?.gender,
      date: ticket?.date,
      time: ticket?.time,
      room: ticket?.room,
      cinema: ticket?.cinema,
      seats: seats,
      userId: user.uid,
      confirmationTime: new Date().toISOString(),
      movieId: idMovie,
    };

    try {
      // Salva o ticket no ID do usuário
      // const docRef = doc(FIREBASE_DB, "tickets", user.uid);
      // await setDoc(ticketData);

      const ticketsCollectionRef = collection(FIREBASE_DB, "tickets");
      await addDoc(ticketsCollectionRef, ticketData); 

      router.push("/(tabs)/profile/");
      console.log("Ticket confirmado com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar o ticket: ", error);
    }
  };
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

        <View className="gap-12 justify-center items-center">
          <View className="flex-col gap-4 justify-center items-center">
            <View className="flex-row gap-2 items-center">
              <Users2 size={24} color={"#000"} />
              <Text className="text-lg font-semibold text-primary">
                Assentos
              </Text>
            </View>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={decrementSeats}
                className="flex-row p-2 rounded-full border border-border"
              >
                <Minus size={24} className="text-primary opacity-80" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-primary w-12 text-center">
                {seats}
              </Text>
              <TouchableOpacity
                onPress={incrementSeats}
                className="flex-row p-2 rounded-full border border-border"
              >
                <Plus size={24} className="text-primary opacity-80" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => confirmSeats()}
            className="bg-primary p-4 rounded-md w-1/2"
          >
            <Text className="text-white text-center font-bold">Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
