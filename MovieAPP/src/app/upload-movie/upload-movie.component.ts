import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MovieClass } from '../_models/movie';
import { User } from '../_models/user';
import { UserManagementServiceService } from '../_services/user-management-service.service';
import { AccountService } from '../_services/account.service';
const APIKEY = 'd6b1bc0a';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});
@Component({
  selector: 'app-upload-movie',
  templateUrl: './upload-movie.component.html',
  styleUrls: ['./upload-movie.component.css'],
})
export class UploadMovieComponent implements OnInit {
  user: User;
  movieDetails: any;
  uploadForm: FormGroup;
  model: any = {};
  isShowDiv = false;
  baseUrl = environment.apiUrl;
  private httpClient: HttpClient;
  constructor(
    private accService: AccountService,
    private toastr: ToastrService,
    private http: HttpClient,
    private umService: UserManagementServiceService,
    httpBackend: HttpBackend
  ) {
    this.httpClient = new HttpClient(httpBackend);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.uploadForm = new FormGroup({
      name: new FormControl(this.model.name, Validators.required),
      price: new FormControl(this.model.price, Validators.required),
      ownerId: new FormControl(this.model.ownerId),
    });
  }

  postFilm() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const id = this.accService.getId(user);
    this.model = this.uploadForm.value;
    this.model.ownerId = id;
    console.log(this.model);
    this.umService.postMovie(this.model).subscribe(
      (res) => {
        this.toastr.success('Film je objavljen');
        this.umService.movformData = new MovieClass();
        window.location.reload();
      },
      (err) => {
        console.log(err);
        console.log(this.model);
      }
    );
  }
  getDetails() {
    var name = this.uploadForm.get('name').value;
    console.log(this.model.name);
    this.httpClient
      .get('http://www.omdbapi.com/?t=' + name + '&apikey=' + APIKEY, {
        params: PARAMS.set('search', name),
      })
      .subscribe((data) => {
        console.log('res', data);
        this.movieDetails = data;
        if (this.movieDetails.Response == 'False') {
          this.toastr.error('Film nije pronađen');
        } else {
          this.toastr.info('Film je pronađen');
          console.log(this.movieDetails);
          this.isShowDiv = true;
        }
      });
  }
  loadLoggedInUser() {
    var user: User = JSON.parse(localStorage.getItem('user'));
    const id = this.accService.getId(user);
  }
}
 