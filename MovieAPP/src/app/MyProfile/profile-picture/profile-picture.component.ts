import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
  }),
};
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  userId: number;
  constructor(private accountService: AccountService, private toastr: ToastrService, private umService: UserManagementServiceService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
    this.loadLoggedInUser()
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }


  initializeUploader() {
    var user: User = JSON.parse(localStorage.getItem('user'));
    this.userId = this.accountService.getId(user);
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/add-photo?id=' + this.userId ,
      authToken: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,  
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        console
        if (response == "Već imate fotografiju") {
          this.toastr.warning("Stan već ima fotografiju");
        }
        else {
          this.toastr.success("Fotografija uspješno uploadana");
          window.setTimeout(function () { location.reload() }, 2000)
        }
      }
    }
  }
  loadLoggedInUser() {
    var user: User = JSON.parse(localStorage.getItem('user'));
    this.userId = this.accountService.getId(user);
    console.log(this.userId)

  }

}
