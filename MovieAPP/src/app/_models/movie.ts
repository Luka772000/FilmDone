import { movieRole } from "./actor";

export class MovieClass {
    id: number = 0;
    name: string = "";
    price: number = 0;
    ownerId: number = 0
}
export interface Movie {
    id: number;
    name: string;
    price: number;
    ownerId: number
}
export class RentMovieClass {
    id: number = 0;
    renterId: number = 0;
    ownerId: number = 0;
}
export interface MovieWithRole {
    id: number;
    name: string;
    price: number;
    ownerId: number
    movieRoles: movieRole
}
export class UpdateMovieClass{
    oldName: string = "";
    newName: string = "";
    price: number = 0;
}