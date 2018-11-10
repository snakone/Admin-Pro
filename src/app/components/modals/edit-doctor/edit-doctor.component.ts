import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})

export class EditDoctorComponent implements OnInit {

  doctor: Doctor;
  doctorForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(public dialog: MatDialog,
              private _doctor: DoctorService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.doctor = this.data;
    this.editDoctorForm();
  }

  editDoctorForm():void{
    this.doctorForm = new FormGroup({
      name: new FormControl(this.doctor.name, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(20),
                                   Validators.pattern(this.namePattern)]),
     lastName: new FormControl(this.doctor.lastName, [  // ADDRESS
                                  Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(25),
                                  Validators.pattern(this.namePattern)])
    });
  }

  updateDoctor(){
    console.log("JODER")
    if (this.doctorForm.invalid) return;
    this.doctor.name = this.doctorForm.value.name;
    this.doctor.lastName = this.doctorForm.value.lastName;

    this._doctor.updateDoctor(this.doctor)
     .subscribe(res => {
       Swal('Operación aceptada', 'Doctor actualizado', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
