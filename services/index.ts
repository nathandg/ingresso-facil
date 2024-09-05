import { cinesCity } from "~/data/cines"
import { Cinema, Session } from "./cinema"
import { MoviesComingSoon, MoviesDisplay } from "~/data/movies";
import { Movie, Type } from "./movies";

export const getAllCinemas = () => {
    return cinesCity.map((cine) => {
        const {id, name, dates} = cine;

        const cinema = new Cinema(id, name);

        dates.map((item) => {
            const {date, sessions} = item;

            sessions.map((session) => {
                const {movieId, type, times} = session;

                const newSession = new Session(movieId, type, times);
                cinema.addSchedule(date, newSession);
            });                
        })

        return cinema;
    })
}

export const getAllMovies = () => {
    const upcoming = MoviesComingSoon.map((movie) => {
        const {id, title, genre, duration, classification, cover} = movie;
        return new Movie(id, title, genre, duration, classification, cover, Type.upcoming);
    });

    const releases = MoviesDisplay.map((movie) => {
        const {id, title, genre, duration, classification, cover} = movie;
        return new Movie(id, title, genre, duration, classification, cover, Type.releases);
    });

    console.log([...upcoming, ...releases]);
    return [upcoming, releases];
}