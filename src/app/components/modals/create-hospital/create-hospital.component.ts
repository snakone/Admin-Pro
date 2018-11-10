import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';  // Material Dialog
import { HospitalService } from 'src/app/services/services.index';
import { Hospital } from 'src/app/models/hospital.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html',
  styleUrls: ['./create-hospital.component.scss']
})

export class CreateHospitalComponent implements OnInit {

  hospital: Hospital;
  hospitalForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  addressPattern = '^[A-Za-z0-9 _]*[A-Za-z0-9/][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _hospital: HospitalService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.createHospitalForm();
  }

  createHospitalForm():void{
    this.hospitalForm = new FormGroup({
      name: new FormControl(null, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(25),
                                   Validators.pattern(this.namePattern)]),
      address: new FormControl(null, [  // ADDRESS
                                  Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(25),
                                  Validators.pattern(this.addressPattern)])
    });
  }

  onSubmit(){
    if (this.hospitalForm.invalid) return false;
    let newHospital = new Hospital(
      this.hospitalForm.value.name,
      this.hospitalForm.value.address,
    );

    this._hospital.createHospital(newHospital)
     .subscribe(res => {
       Swal('Felicidades!', 'Hospital creado satisfactoriamente', 'success')
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
