import { Stack } from "expo-router";
import * as React from "react";
import { Text, ScrollView } from "react-native";
import MovieCard from "~/components/MovieCard";
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";

export default function MoviesScreen() {
  return (
    <ScrollView className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4 text-primary">Em cartaz</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="mb-12"
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {MoviesDisplay.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ScrollView>
      <Text className="text-2xl font-bold mt-6 mb-4 text-primary">
        Em breve
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="mb-12"
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {MoviesComingSoon.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
