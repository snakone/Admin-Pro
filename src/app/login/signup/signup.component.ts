import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/services.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

declare function init_plugins();   // Init JQuery Plugins

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _user: UserService,
              private router: Router) { }

  ngOnInit() {
    // When coming Straight and from Outside, Init JQuery Plugins -> Loader
    init_plugins();
    this.createSignUpForm();
    // this.registerForm.setValue({
    //   name: "Sergi",
    //   email: "snak_one@hotmail.com",
    //   password: "12345",
    //   passwordMatch: "12345",
    //   conditions: true
    // })

  }

  theyMatchError(one: string, two: string){
    return (group: FormGroup) => {
      let password = group.controls[one].value;
      let passwordMatch = group.controls[two].value;
      if (password === passwordMatch) return null;
      return {
        theyMatch : true
      };
    }
  }

  createSignUpForm():void{
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(20),
                                   Validators.pattern(this.namePattern)]),
     lastName: new FormControl(null, [  // NAME
                                  Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(25),
                                  Validators.pattern(this.namePattern)]),
      email: new FormControl(null,[  // EMAIL
                                   Validators.required,
                                   Validators.email,
                                   Validators.minLength(5),
                                   Validators.maxLength(35)]),
      password: new FormControl(null, [  // PASSWORD
                                   Validators.required,
                                   Validators.minLength(5),
                                   Validators.maxLength(25)]),
      passwordMatch: new FormControl(null, [  // MATCH
                                   Validators.required,
                                   Validators.minLength(5),
                                   Validators.maxLength(25)]),
      conditions: new FormControl(false, Validators.requiredTrue)  // CONDITIONS
    }, { validators: this.theyMatchError('password', 'passwordMatch')});
  }

  onSubmit(){
    if (this.signUpForm.invalid) return false;
    let newUser = new User(
      this.signUpForm.value.name,
      this.signUpForm.value.email,
      this.signUpForm.value.password,
      this.signUpForm.value.lastName
    );

    this._user.createUser(newUser)
     .subscribe(() => {
       Swal('Felicidades!', 'Usuario creado satisfactoriamente', 'success')
        .then(() => {
           this.router.navigate(['/signin']);
        })
     });
  }

}
