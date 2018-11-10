import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/services.index';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2'
import { LIMIT } from 'src/app/config/config';

import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { EditDoctorComponent } from 'src/app/components/modals/edit-doctor/edit-doctor.component';
import { CreateDoctorComponent } from 'src/app/components/modals/create-doctor/create-doctor.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})

export class DoctorsComponent implements OnInit {

  constructor(private _doctor: DoctorService,
              public dialog: MatDialog) { }

  doctors: Doctor[] = [];
  from: number = 0;
  totalDoctors: number = 0;
  searching: boolean = false;
  limit: number;
  options: ScrollToOptions;

  ngOnInit() {
    this.limit = LIMIT;
    this.getDoctors();
    const input = document.getElementById('search');
    this.listenInputChanges(input);
  }

  listenInputChanges(input: HTMLElement){
    fromEvent(input, 'input', {passive: true})
      .pipe(map((k: KeyboardEvent) => {
            return k.target['value'];
        }),debounceTime(1500))
         .subscribe(res => {
        if (res != '') {
          this._doctor.searchDoctor(res)
            .subscribe( (doctors: Doctor[]) => {
              this.doctors = doctors;
              this.searching = true;
            });
        } else {
          this.getDoctors();
          this.searching = false;
          return false;
        }
      });
  }

  getDoctors(amount?:number){
    if (amount == LIMIT && this.totalDoctors - this.from == 1 && this.from !=0) {
      console.log(this.from)
      this.from = (this.totalDoctors - 1 ) - amount;
    }
    console.log(this.from)
      this._doctor.getDoctorList(this.from)
       .subscribe((res:any) => {
         this.doctors = res.doctors;
         this.totalDoctors = res.doctorCount;
       });
  }

  editDoctor(doctor:Doctor){
  this.dialog.open(EditDoctorComponent,{data:doctor});  // New Dialog
  }

  openDoctorDialog(){
    const dialogRef = this.dialog.open(CreateDoctorComponent,{});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
    console.log("cerro dialog")
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getDoctors();
        }, 1500)
      }  // End of If (result)
    });
  }

  openImageDialog(doctor:Doctor){
    let data = {
      _id: doctor._id,
      collection: 'Doctor'
    }
    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
    console.log("modal cerrado")
        setTimeout(() => {   // Wait a bit to get Updated Data Again
           this.getDoctors();
        }, 1500)
      }  // End of If (result)
    });
  }

  deleteDoctor(doctor:Doctor){
     Swal({
       title: "¿Estás seguro?",
       text: `Estás apunto de borrar a ${doctor.name}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Sí'
       })
      .then(res => {
        if (res.value){
          this._doctor.deleteDoctor(doctor._id)
           .subscribe(() => {
             Swal('Operación aceptada', 'Doctor borrado', 'info');
             this.getDoctors(LIMIT);
           });
        }
      });
  }

  changeFrom(value: number){
    let rows = document.getElementById("rows").classList;
    if (value === LIMIT){
        rows.add("slideOutLeft");
        rows.remove("slideInRight","slideInLeft");
        setTimeout(()=> {
          rows.remove("slideOutLeft");
          rows.add("slideInRight");
        }, 1000);
    }
    else if (value === -LIMIT) {
        rows.add("slideOutRight");
        rows.remove("slideInRight", "slideInLeft");
        setTimeout(()=> {
          rows.remove("slideOutRight");
          rows.add("slideInLeft");
        }, 1000);
    }

    let from = this.from + value;
    if (from >= this.totalDoctors || from < 0) return false;
    this.from += value;
    this.getDoctors();
  }

}
