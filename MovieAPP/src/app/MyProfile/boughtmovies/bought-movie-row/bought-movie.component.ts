import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Movie, RentMovieClass } from 'src/app/_models/movie';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';
import { UpdateMovieDialogComponent } from 'src/app/MyProfile/boughtmovies/bought-movie-row/update-movie-dialog/update-movie-dialog.component';
import { AddActorDialogComponent } from './add-actor-dialog/add-actor-dialog.component';

const APIKEY = 'd6b1bc0a';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

@Component({
  selector: '[app-bought-movie]',
  templateUrl: './bought-movie.component.html',
  styleUrls: ['./bought-movie.component.css'],
})
export class BoughtMovieComponent implements OnInit {
  movieDetails: any;
  @Input() movie: Movie;
  showMemOrMod: boolean;
  roles: any;
  bsModalRef: BsModalRef;
  private httpClient: HttpClient;
  constructor(
    private modalService: BsModalService,
    private accService: AccountService,
    private toastr: ToastrService,
    private http: HttpClient,
    private umService: UserManagementServiceService,
    httpBackend: HttpBackend
  ) {
    this.httpClient = new HttpClient(httpBackend);
  }

  ngOnInit(): void {
    this.getDetails();
  }
  unrentMovie() {
    this.umService.removformData.id = this.movie.id;
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.umService.removformData.renterId = this.accService.getId(user);
    this.umService.unrentMovie().subscribe(
      (res) => {
        this.umService.removformData = new RentMovieClass();
      },
      (err) => {
        if (err.status == 200) {
          this.toastr.success('Uspješno ste uklonili film iz vaše liste.');
          window.location.reload();
        } else this.toastr.error('Došlo je do greške.');
      }
    );
  }
  deleteMovie(id: number) {
    this.umService.deleteMovie(id).subscribe(
      (res) => {},
      (err) => {
        if (err.status == 200) {
          this.toastr.success('Uspješno ste uklonili film iz vaše liste.');
          window.location.reload();
        } else this.toastr.error('Došlo je do greške.');
      }
    );
  }
  getDetails() {
    var name = this.movie.name;
    this.httpClient
      .get('http://www.omdbapi.com/?t=' + name + '&apikey=' + APIKEY, {
        params: PARAMS.set('search', name),
      })
      .subscribe((data) => {
        this.movieDetails = data;
      });
  }
  openDialog(movie: Movie) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        movie,
      },
    };
    this.bsModalRef = this.modalService.show(
      UpdateMovieDialogComponent,
      config
    );
  }
  openActorDialog(movie: Movie) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        movie,
      },
    };
    this.bsModalRef = this.modalService.show(AddActorDialogComponent, config);
  }
}
