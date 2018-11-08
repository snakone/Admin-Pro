import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';  // Dialog
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})

export class ImageDialogComponent implements OnInit {

  user: User;
  uploadPictureForm: FormGroup;
  disabled: boolean = false;
  fileToUpload: File;
  temporalImage: string;
  imagePattern: string = "^.+\.(([pP][nN][gG])|([jJ][pP][gG]))$";

  constructor(private _user: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.user = this._user.user;
    this.createSignUpForm();
  }

  createSignUpForm():void {
    this.uploadPictureForm = new FormGroup({
        image: new FormControl('', [  // PASSWORD
                                     Validators.required,
                                     Validators.minLength(4),
                                     Validators.maxLength(69),
                                     Validators.pattern(this.imagePattern)])
    });
  }

  uploading(event, file: File){
    event.preventDefault();
    if (!file) {
      this.fileToUpload = null;
      return false;
    }
    if (!file.type.includes('image')){
      Swal('Error', 'Sólo puedes subir imagenes', 'error');
      return false;
    }
    this.fileToUpload = file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {this.temporalImage = reader.result.toString();
}
  }

  onSubmitPicture(){
    this._user.changePicture(this.fileToUpload, this.user['_id'])
  }

}
