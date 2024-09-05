import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";
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

export default function MovieDetails() {
  const [movie, setMovie] = useState<MovieCardProps["movie"] | null>(null);
  const { idMovie } = useLocalSearchParams();

  useEffect(() => {
    if (idMovie) {
      const foundMovie = [...MoviesDisplay, ...MoviesComingSoon].find(
        (movie) => movie.id === Number(idMovie)
      );
      setMovie(foundMovie || null);
    }
  }, [idMovie]);

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
              {Array.from({ length: 10 }).map((_, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 items-center"
                  style={{ elevation: 5 }}
                >
                  <Text className="mx-2 text-lg font-bold text-primary">
                    HOJE
                  </Text>
                  <Text className="mx-2 text-sm text-primary">02/09</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="w-full">
            <Card className="bg-primary-foreground mx-2 mb-12 border border-border">
              <CardHeader className="bg-primary-foreground border-b border-border items-center">
                <Text className="text-xl font-bold">Catuai Shopping</Text>
              </CardHeader>
              <CardContent className="flex-row justify-between">
                <View className="flex-1 flex-col justify-start gap-4">
                  <View>
                    <Text className="text-lg font-bold py-4">
                      Normal - Dublado
                    </Text>
                    <View className="flex-row justify-start gap-4 flex-wrap">
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">15:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">16:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">17:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">18:00</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text className="text-lg font-bold py-4">
                      Normal - Legendado
                    </Text>
                    <View className="flex-row justify-start gap-4 flex-wrap">
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">15:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">16:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">17:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">18:00</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground mx-2 mb-12 border border-border">
              <CardHeader className="bg-primary-foreground border-b border-border items-center">
                <Text className="text-xl font-bold">Catuai Shopping</Text>
              </CardHeader>
              <CardContent className="flex-row justify-between">
                <View className="flex-1 flex-col justify-start gap-4">
                  <View>
                    <Text className="text-lg font-bold py-4">
                      Normal - Dublado
                    </Text>
                    <View className="flex-row justify-start gap-4 flex-wrap">
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">15:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">16:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">17:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">18:00</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text className="text-lg font-bold py-4">
                      Normal - Legendado
                    </Text>
                    <View className="flex-row justify-start gap-4 flex-wrap">
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">15:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">16:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">17:00</Text>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-start gap-2">
                        <TouchableOpacity className="bg-primary-foreground px-5 py-2 rounded-lg border border-primary">
                          <Text className="text-primary">18:00</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
