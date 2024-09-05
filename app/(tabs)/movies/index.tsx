import { Stack } from "expo-router";
import * as React from "react";
import { Text, ScrollView } from "react-native";
import MovieCard from "~/components/MovieCard";
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";

export default function MoviesScreen() {
  return (
    <ScrollView className="flex-1 bg-secondary/40 p-6">
      <Stack.Screen options={{ headerShown: false }} />
      <Text className="text-2xl font-bold text-primary mb-4">Em cartaz</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="mb-12"
      >
        {MoviesDisplay.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ScrollView>
      <Text className="text-2xl font-bold text-primary mt-6 mb-4">
        Em breve
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="mb-12"
      >
        {MoviesComingSoon.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
