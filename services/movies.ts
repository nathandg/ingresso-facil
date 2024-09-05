export enum Type {
    releases = "releases",
    upcoming = "upcoming",
}

export class Movie {

    id: number;
    title: string = "";
    genre: string = "";
    duration: string = "";
    classification: string = "";
    cover: string = "";
    type: Type;

    constructor(id: number, title: string, genre: string, duration: string, classification: string, cover: string, type: Type) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.classification = classification;
        this.cover = cover;
        this.type = type;
    }
}