import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";

export interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    genre: string;
    duration: string;
    classification: string;
    cover: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie }) => (
  <TouchableOpacity
    className="rounded-lg p-4 h-96 bg-primary-foreground"
    style={{ elevation: 5, marginHorizontal: 16 }}
    activeOpacity={0.8}
    onPress={() => {
      router.navigate({
        pathname: "/movies/movie-details",
        params: { idMovie: movie.id },
      });
    }}
  >
    <Image
      source={{ uri: movie.cover }}
      className="w-36 rounded-lg mb-3 h-48"
      resizeMode="cover"
    />
    <View className="flex h-36 justify-between">
      <View>
        <Text className="text-xl font-bold w-36 text-primary" numberOfLines={2}>
          {movie.title}
        </Text>
        <Text className="text-primary w-36" numberOfLines={1}>
          {movie.genre}
        </Text>
      </View>
      <View>
        <Text className="text-primary opacity-50">Duração: {movie.duration}</Text>
        <Text className="text-primary opacity-50">
          Classificação: {movie.classification}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
));

export default MovieCard;
