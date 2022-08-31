import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { GetUser, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';

@Component({
  selector: 'app-boughtmovies',
  templateUrl: './boughtmovies.component.html',
  styleUrls: ['./boughtmovies.component.css'],
})
export class BoughtmoviesComponent implements OnInit {
  movies: Movie[];
  user: GetUser;
  muser: User;
  roles: string[];
  showMemOrMod: boolean = false;
  constructor(
    private accService: AccountService,
    private umService: UserManagementServiceService
  ) {}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.roles = this.accService.getRoles(user);
    if (this.roles.includes('Member')) {
      this.loadRentedMovies();
    }
    else{this.loadUploadedMovies();}
    
    
  }

  loadLoggedInUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.roles = this.accService.getRoles(user);
  }

  loadRentedMovies() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const id = this.accService.getId(user);
    this.umService.getUsersRentedMovies(id).subscribe((movie: Movie[]) => {
      this.movies = movie;
    });
  }
  loadUploadedMovies() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const id = this.accService.getId(user);
    this.umService.getUsersUploadedMovies(id).subscribe((movie: Movie[]) => {
      this.movies = movie;
    });
  }
}
