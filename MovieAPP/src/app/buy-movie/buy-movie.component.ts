import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Movie } from '../_models/movie';
import { UserManagementServiceService } from '../_services/user-management-service.service';

@Component({
  selector: 'app-buy-movie',
  templateUrl: './buy-movie.component.html',
  styleUrls: ['./buy-movie.component.css']
})
export class BuyMovieComponent implements OnInit {
  movies: Movie[];
  bsModalRef: BsModalRef;
  users: any;
  searchText = '';
  constructor(private http: HttpClient, public modalService: BsModalService, private umService: UserManagementServiceService) { }

  ngOnInit(): void {
    this.loadMovies()
  }
  loadMovies() {
    this.umService.getMovies().subscribe(movie => {
      this.movies = movie;
      console.log(this.movies);
    });
  }
}
