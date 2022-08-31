import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GetUser, UpdateUser, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private umService: UserManagementServiceService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}
  model: any = {};
  user: GetUser;
  puser: User;
  updateForm: FormGroup;
  bsModalRef: BsModalRef;
  ngOnInit(): void {
    this.loadLoggedInUser();
    this.initializeForm();
  }
  initializeForm() {
    this.updateForm = new FormGroup({
      username: new FormControl({ disabled: true }, Validators.required),
      newUsername: new FormControl(),
      currentPassword: new FormControl(
        this.model.currentPassword,
        Validators.required
      ),
      newPassword: new FormControl(this.model.newPassword, Validators.required),
      email: new FormControl(this.model.email, Validators.required),
    });
  }
  updateUser() {
    this.model = this.updateForm.value;
    this.accountService.update(this.model).subscribe(
      (res) => {
        this.toastr.success('Profile updated successfully');
        this.accountService.userUpFormData = new UpdateUser();
        console.log('Uspjeh');
      },
      (error) => {
        if (error.status == 400) {
          this.toastr.error('Neispravna stara lozinka');
        }
      }
    );
  }
  loadLoggedInUser() {
    var user: User = JSON.parse(localStorage.getItem('user'));
    const id = this.accountService.getId(user);
    if (user) {
      this.umService.getMember(id).subscribe((user1) => {
        this.user = user1;

        this.updateForm.patchValue({
          username: user1.userName,
          email: user1.email,
          newUsername: user1.userName,
        });
      });
    }
  }

  openDialog(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
      },
    };
    this.bsModalRef = this.modalService.show(ProfilePictureComponent, config);
  }
}
