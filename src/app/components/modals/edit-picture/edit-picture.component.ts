import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, HospitalService, DoctorService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.scss']
})

export class EditPictureComponent implements OnInit {

  uploadPictureForm: FormGroup;
  disabled: boolean = false;
  fileToUpload: File;
  temporalImage: string;
  imagePattern: string = "^.+\.(([pP][nN][gG])|([jJ][pP][gG]))$";

  constructor(private _user: UserService,
              private _hospital: HospitalService,
              private _doctor: DoctorService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createSignUpForm();
    console.log(this.data)
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
    console.log(this.data)
    if (this.data.collection == "User")
    this._user.changePicture(this.fileToUpload, this.data._id);
    if (this.data.collection == "Hospital")
    this._hospital.changePicture(this.fileToUpload, this.data._id);
    if (this.data.collection == "Doctor")
    this._doctor.changePicture(this.fileToUpload, this.data._id);
  }

}
