import { Movie } from "./movie";

export interface movieRole {
        roleName: string;
        movie: Movie;
        actor: Actor;
        movieId: number;
        actorId: number;

}
export interface Actor {
        id: number;
        name: string;
}