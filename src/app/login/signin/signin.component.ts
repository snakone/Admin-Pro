import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/services.index';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2'
import { debounceTime } from 'rxjs/operators';

declare function init_plugins();   // Init JQuery Plugins
declare const gapi: any;  // Google API

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SignInComponent implements OnInit {

  remember: boolean = false;
  signInForm: FormGroup;
  disabled: boolean = true;
  auth2: any;

  constructor(private _user: UserService,
              public router: Router) { }

  ngOnInit() {
  // When coming Straight and from Outside, Init JQuery Plugins -> Loader
    init_plugins();
    this.googleInit();
    this.createSignUpForm();
    this.getRememberedEmail();
  }

  createSignUpForm():void{
    this.signInForm = new FormGroup({
        email: new FormControl(null,[  // EMAIL
                                     Validators.required,
                                     Validators.email,
                                     Validators.minLength(5),
                                     Validators.maxLength(35)]),
    password: new FormControl(null, [  // PASSWORD
                                     Validators.required,
                                     Validators.minLength(5),
                                     Validators.maxLength(25)]),
    remember: new FormControl(false, Validators.nullValidator)});
  }

  onSubmit(){
    if (this.signInForm.invalid) return false;
    let userSignIn = new User(null,
                            this.signInForm.value.email,
                            this.signInForm.value.password);
    this._user.signInUser(userSignIn, this.signInForm.value.remember)
     .subscribe(res => {
       if (res){
         Swal('Bienvenido!', res.user.name, 'success')
          .then(() => {
            this.router.navigate(['/dashboard']);
          });
        }
         // Swal('Error!', 'Por favor, comprueba tus credenciales', 'error');
     })
  }

  getRememberedEmail():void{
    let email = localStorage.getItem('email') || '';
    if (email.length >= 5)
    this.signInForm.setValue({email: email, password: null, remember: true});
  }

  googleInit(){
    gapi.load('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: '821401232099-u2oo8vjhjm977srfir4aqlgn2gfu0rkg.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this._user.auth2 = this.auth2;
      this.shootGoogleSignIn(document.getElementById("google"));
    });
  }

  shootGoogleSignIn(element){
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._user.googleSignIn(token)
       .subscribe(res => {
         if (res){
           Swal('Bienvenido!', 'La autentificación con Google fué un éxito', 'success')
            .then(() => {
              window.location.href = '#/dashboard';
            });
          }
       });
    });
  }

}
