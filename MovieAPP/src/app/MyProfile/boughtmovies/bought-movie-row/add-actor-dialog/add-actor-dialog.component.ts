import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/_models/movie';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';

@Component({
  selector: 'app-add-actor-dialog',
  templateUrl: './add-actor-dialog.component.html',
  styleUrls: ['./add-actor-dialog.component.css'],
})
export class AddActorDialogComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    private accService: AccountService,
    private toastr: ToastrService,
    private http: HttpClient,
    private umService: UserManagementServiceService
  ) {}
  movie: Movie;

  ngOnInit(): void {
    this.initializeForm();
  }
  postMovieRole() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const id = this.accService.getId(user);
    this.model = this.actorForm.value;
    this.model.ownerId = id;
    this.umService.postMovieRole(this.model).subscribe(
      (res) => {
        console.log('Uspjeh');
        this.toastr.success('Uspješno ste dodali glumca!');
        this.bsModalRef.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  initializeForm() {
    this.actorForm = new FormGroup({
      movieId: new FormControl(this.model.id, Validators.required),
      rolename: new FormControl(this.model.rolename, Validators.required),
      actorname: new FormControl(this.model.actorname, Validators.required),
    });
    this.actorForm.controls['movieId'].setValue(this.movie.id);
  }

  actorForm: FormGroup;
  model: any = {};
}
