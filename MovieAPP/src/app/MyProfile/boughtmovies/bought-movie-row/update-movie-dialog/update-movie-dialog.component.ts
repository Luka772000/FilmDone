import { UpdateMovieClass } from './../../../../_models/movie';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Movie, MovieClass } from 'src/app/_models/movie';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';
@Component({
  selector: 'app-update-movie-dialog',
  templateUrl: './update-movie-dialog.component.html',
  styleUrls: ['./update-movie-dialog.component.css'],
})
export class UpdateMovieDialogComponent implements OnInit {
  constructor(
    private memberService: UserManagementServiceService,
    private toastr: ToastrService
  ) {}
  upmovie: any = {};
  movie: Movie;
  updateForm: FormGroup;
  model: any = {};
  ngOnInit(): void {
    console.log('dadawdad');
    console.log(this.movie);
    this.initializeForm();
  }
  initializeForm() {
    this.updateForm = new FormGroup({
      oldName: new FormControl(this.upmovie.oldName),
      newName: new FormControl(this.upmovie.newName, Validators.required),
      price: new FormControl(this.upmovie.price, Validators.required),
    });
    this.updateForm.controls['oldName'].setValue(this.movie.name);
  }
  updateMovie() {
    console.log(this.updateForm.value);
    this.memberService.upMovFormData = this.updateForm.value;
    this.memberService.updateMovie().subscribe(
      (res) => {
        this.memberService.movformData = new MovieClass();
        this.toastr.success('Film je uspješno izmijenjen');
        window.setTimeout(function () {
          location.reload();
        }, 2000);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
