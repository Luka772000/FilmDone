import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left"
    }),
    ModalModule.forRoot(),
    FileUploadModule,
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    ModalModule,
    FormsModule,
    FileUploadModule,

  ]
})
export class SharedModule { }