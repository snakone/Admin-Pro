import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { HospitalService } from 'src/app/services/services.index';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2'
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})

export class EditHospitalComponent implements OnInit {

  hospital: Hospital;
  hospitalForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  addressPattern = '^[A-Za-z0-9 _]*[A-Za-z0-9/][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _hospital: HospitalService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.hospital = this.data;
    this.editHospitalForm();
  }

  editHospitalForm():void{
    this.hospitalForm = new FormGroup({
      name: new FormControl(this.hospital.name, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(20),
                                   Validators.pattern(this.namePattern)]),
     address: new FormControl(this.hospital.address, [  // ADDRESS
                                  Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(25),
                                  Validators.pattern(this.addressPattern)])
    });
  }

  updateHospital():void {
    console.log("JODER")
    if (this.hospitalForm.invalid) return;
    this.hospital.name = this.hospitalForm.value.name;
    this.hospital.name = this.hospitalForm.value.name;

    this._hospital.updateHospital(this.hospital)
     .subscribe(() => {
       Swal('Operación aceptada', 'Hospital actualizado', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
