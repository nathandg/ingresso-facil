import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { P } from "~/components/ui/typography";
import { useLocalSearchParams } from "expo-router";
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";
import { MovieCardProps } from "~/components/MovieCard";

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
    <Card>
      <Stack.Screen options={{ headerShown: false }} />
      <CardHeader>
        <CardTitle>Movies Details</CardTitle>
        <CardDescription>
          {movie ? movie.title : "No movie selected"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <P>Here you can see all the details of the movie you have selected.</P>
      </CardContent>
    </Card>
  );
}
