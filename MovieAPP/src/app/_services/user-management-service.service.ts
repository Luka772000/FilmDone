import { UpdateMovieClass } from './../_models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MovieClass, RentMovieClass } from '../_models/movie';
import { GetUser, User } from '../_models/user';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserManagementServiceService {
  removformData: RentMovieClass = new RentMovieClass();
  movformData: MovieClass = new MovieClass();
  upMovFormData: UpdateMovieClass = new UpdateMovieClass();
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMember(id: string) {
    return this.http.get<GetUser>(this.baseUrl + 'user/userid/' + id);
  }
  getUser(id: string) {
    return this.http.get<User>(this.baseUrl + 'user/userid/' + id);
  }
  postMovie(movieForm: any) {
    return this.http.post(
      this.baseUrl + `MovieCreatingAndRenting/create`,
      movieForm
    );
  }
  getMovies() {
    return this.http.get<MovieClass[]>(
      this.baseUrl + `MovieCreatingAndRenting/unRentedFilms`
    );
  }
  getRentedMovies() {
    return this.http.get<MovieClass[]>(
      this.baseUrl + `MovieCreatingAndRenting/rentedFilms`
    );
  }
  getUsersRentedMovies(id: number) {
    return this.http.get<MovieClass[]>(
      this.baseUrl + `MovieCreatingAndRenting/RenterId/` + id
    );
  }
  getUsersUploadedMovies(id: number) {
    return this.http.get<MovieClass[]>(
      this.baseUrl + `MovieCreatingAndRenting/OwnerId/` + id
    );
  }
  rentMovie() {
    return this.http.put(
      this.baseUrl + `MovieCreatingAndRenting/Renting`,
      this.removformData
    );
  }
  unrentMovie() {
    return this.http.put(
      this.baseUrl + `MovieCreatingAndRenting/UnRent`,
      this.removformData
    );
  }
  deleteMovie(id: number) {
    return this.http.delete(
      this.baseUrl + `MovieCreatingAndRenting/delete/` + id
    );
  }
  postMovieRole(actorForm: any) {
    return this.http.post(this.baseUrl + `Role`, actorForm);
  }
  getMoviesRoles(id: number) {
    return this.http.get(this.baseUrl + `Role/` + id);
  }
  updateMovie() {
    console.log(this.upMovFormData);
    return this.http.put(
      this.baseUrl + `MovieCreatingAndRenting`,
      this.upMovFormData
    );
  }
}
