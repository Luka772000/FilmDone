import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';

@Component({
  selector: 'app-movie-info-modal',
  templateUrl: './movie-info-modal.component.html',
  styleUrls: ['./movie-info-modal.component.css']
})
export class MovieInfoModalComponent implements OnInit {
  movieRoles: any
  movie: Movie
  constructor(private umService: UserManagementServiceService) { }
  movieDetails: any;
  ngOnInit(): void {
    this.loadMoviesRoles()
  }
  loadMoviesRoles() {
    this.umService.getMoviesRoles(this.movie.id).subscribe(role => {
      this.movieRoles = role;
      console.log(this.movieRoles);
    });
  }
}


