import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/services.index';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {

  user: User;
  updateForm: FormGroup;
  disabled: boolean;
  clean: boolean;
  areYouFromGoogle: boolean;

  constructor(public _user: UserService) { }

  ngOnInit() {
    this.areYouFromGoogle = this._user.user.google;
    this.user = this._user.user;
    console.log("Google: " + this.user.google)
    this.createSignUpForm();
  }

  createSignUpForm():void {
    this.updateForm = new FormGroup({
        name: new FormControl(this.user.name, [  // NAME
                                     Validators.required,
                                     Validators.minLength(3),
                                     Validators.maxLength(20)]),
        lastName: new FormControl(this.user.lastName, [  // LASTNAME
                                     Validators.required,
                                     Validators.minLength(3),
                                     Validators.maxLength(20)]),
        email: new FormControl({value: this.user.email, disabled: this.areYouFromGoogle}, [  // EMAIL
                                     Validators.required,
                                     Validators.email,
                                     Validators.minLength(5),
                                     Validators.maxLength(35)]),
    });
  }

  onSubmitProfile(){
    console.log("Nombre en el form: " + this.updateForm.value.name);
    if (!this.user.google){
      this.user.email = this.updateForm.value.email;
    }

    this.user.name = this.updateForm.value.name;
    this.user.email = this.user.email;
    this.user.lastName = this.updateForm.value.lastName;

    this._user.updateUser(this.user)
     .subscribe(res => {
       this._user.user.name = res.name;
       this._user.user.lastName = res.lastName;
       console.log("Nombre respuesta Servidor FINAL: " + res.name);
         Swal('Muy bien!', 'Usuario actualizado satisfactoriamente', 'success')
         // Swal('Error!', 'Por favor, comprueba tus credenciales', 'error');
     });
  }

  resetForm(){
    if (this.user.google){
      this.updateForm.controls['name'].reset();
      this.updateForm.controls['lastName'].reset();
    } else this.updateForm.reset();

  }

}
