import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";
import { cinesCity } from "~/data/cines";
import { MovieCardProps } from "~/components/MovieCard";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Clapperboard } from "~/lib/icons/Clapperboard";
import { format } from "date-fns";

interface Session {
  movieId: number;
  type: string;
  times: string[];
}

interface Date {
  sessions: Session[];
  date: string;
}

interface Cinema {
  dates: Date[];
  id: number;
  name: string;
}

export default function MovieDetails() {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieCardProps["movie"] | null>(null);
  const { idMovie } = useLocalSearchParams();
  const [cine, setCine] = useState<Cinema[] | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const notComingSoon = MoviesDisplay.map((movie) => movie.id).includes(
    Number(idMovie)
  );

  const getDates = (numDays: number) => {
    const today = new Date();
    return Array.from({ length: numDays }).map((_, index) => {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + index);

      let dayLabel =
        index === 0 ? "HOJE" : format(currentDate, "eee").toUpperCase();

      const daysMap: { [key: string]: string } = {
        SUN: "DOM",
        MON: "SEG",
        TUE: "TER",
        WED: "QUA",
        THU: "QUI",
        FRI: "SEX",
        SAT: "SÁB",
      };

      dayLabel = daysMap[dayLabel] || dayLabel;

      const originalDate = format(currentDate, "yyyy-MM-dd");
      const formattedDate = format(currentDate, "dd/MM");

      return { dayLabel, formattedDate, originalDate };
    });
  };

  let dates = getDates(7);

  useEffect(() => {
    let foundMovie = null;
    if (idMovie) {
      foundMovie = [...MoviesDisplay, ...MoviesComingSoon].find(
        (movie) => movie.id === Number(idMovie)
      );
      setMovie(foundMovie || null);

      const movieCinemas = cinesCity
        .filter((cinema) =>
          cinema.dates.some((date) =>
            date.sessions.some((session) => session.movieId === Number(idMovie))
          )
        )
        .map((cinema) => ({
          ...cinema,
          dates: cinema.dates.map((date) => ({
            ...date,
            sessions: date.sessions.filter(
              (session) => session.movieId === Number(idMovie)
            ),
          })),
        }));

      setCine(movieCinemas);
      setSelectedDate(dates[0].originalDate);
    }

    return () => {
      setMovie(null);
      setCine(null);
    };
  }, [idMovie]);

  const sessionsForSelectedDate = cine
    ?.map((cinema) => ({
      cinemaName: cinema.name,
      sessions:
        cinema.dates.find((date) => date.date === selectedDate)?.sessions || [],
    }))
    .filter((cinema) => cinema.sessions.length > 0);

  return (
    <ScrollView className="flex-1 w-full h-full">
      <ImageBackground
        source={{ uri: movie?.cover }}
        className="w-full h-96"
        resizeMode="cover"
        blurRadius={5}
      >
        <View
          className="p-4 display flex-1 flex-row justify-around items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View className="flex-row justify-around w-full">
            <Image
              source={{ uri: movie?.cover }}
              className="w-44 rounded-lg mb-3 h-60 border border-white"
              resizeMode="cover"
            />
            <View className="flex justify-start w-44">
              <View>
                <Text className="text-xl font-bold color-white">
                  {movie?.title}
                </Text>
                <Text className="color-white">{movie?.genre}</Text>
              </View>
              <View className="mt-4">
                <Text className="color-gray-300">
                  Duração: {movie?.duration}
                </Text>
                <Text className="color-gray-300">
                  Classificação: {movie?.classification}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View className="w-full">
        <View className="width-full bg-primary-foreground p-4 items-center">
          <Text className="text-xl font-bold text-primary">Sessões</Text>
        </View>
        <View className="justify-around items-center">
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="bg-primary-foreground border-t border-b border-border mb-12"
          >
            <View className="flex-row gap-2">
              {notComingSoon &&
                dates.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-4 items-center"
                    style={{ elevation: 5 }}
                    onPress={() => {
                      setSelectedDate(date.originalDate);
                      console.log(date);
                    }}
                  >
                    <Text className="mx-2 text-lg font-bold text-primary">
                      {date.dayLabel}
                    </Text>
                    <Text className="mx-2 text-sm text-primary">
                      {date.formattedDate}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>

          <View className="w-full">
            {sessionsForSelectedDate &&
              sessionsForSelectedDate.length > 0 &&
              sessionsForSelectedDate.map((cinema, idx) => (
                <Card
                  key={idx}
                  className="bg-primary-foreground mx-2 mb-12 border border-border"
                >
                  <CardHeader className="border-b border-border flex-row justify-center mb-4">
                    <Text className="text-lg font-semibold text-primary">
                      {cinema.cinemaName}
                    </Text>
                  </CardHeader>
                  <CardContent className="flex-col justify-between">
                    {cinema.sessions.map((session, index) => (
                      <View key={index} className="mb-4">
                        <Text className="text-base font-semibold text-primary mb-2">
                          {session.type}
                        </Text>
                        <View className="flex-row justify-start gap-4 flex-wrap">
                          {session.times.map((time, idx) => (
                            <TouchableOpacity
                              key={idx}
                              className="px-5 py-2 rounded-lg border border-primary"
                              onPress={() => {
                                router.navigate({
                                  pathname: "/movies/get-ticket",
                                  params: {
                                    idMovie: movie?.id,
                                    date: selectedDate,
                                    time: time,
                                    cinema: cinema.cinemaName,
                                    room: "Sala 1",
                                  },
                                });
                              }}
                            >
                              <Text className="text-primary">{time}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
