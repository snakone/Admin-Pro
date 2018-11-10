import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';  // Material Dialog
import { DoctorService, HospitalService } from 'src/app/services/services.index';
import { Doctor } from 'src/app/models/doctor.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.scss']
})
export class CreateDoctorComponent implements OnInit {

    doctor: Doctor;
    hospitals: Hospital[];
    doctorForm: FormGroup;
    namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
    disabled: boolean = true;

    constructor(private _doctor: DoctorService,
                private _hospital: HospitalService,
                public dialog: MatDialog) { }

    ngOnInit() {
      this.createDoctorForm();
      this._hospital.getHospitalList(0)  // From 0
       .subscribe((res:any) => {
         this.hospitals = res.hospitals as Hospital[];
       });

    }

    createDoctorForm():void{
      this.doctorForm = new FormGroup({
        name: new FormControl(null, [  // NAME
                                     Validators.required,
                                     Validators.minLength(3),
                                     Validators.maxLength(20),
                                     Validators.pattern(this.namePattern)]),
       lastName: new FormControl(null, [  // ADDRESS
                                    Validators.required,
                                    Validators.minLength(3),
                                    Validators.maxLength(25),
                                    Validators.pattern(this.namePattern)]),
        hospital: new FormControl(null, [])
      });
    }

    onSubmit(){
      console.log("JODER")
      if (this.doctorForm.invalid) return false;

      let newDoctor = new Doctor(
        this.doctorForm.value.name,
        this.doctorForm.value.lastName,
        this.doctorForm.value.hospital
      );

      this._doctor.createDoctor(newDoctor)
       .subscribe(res => {
         Swal('Felicidades!', 'Doctor creado satisfactoriamente', 'success')
          .then(() => {
            this.dialog.closeAll();
          })
       });
    }

  }
