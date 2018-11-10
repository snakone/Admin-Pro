import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/services.index';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2'
import { LIMIT } from 'src/app/config/config';

import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { CreateHospitalComponent } from 'src/app/components/modals/create-hospital/create-hospital.component';
import { EditHospitalComponent } from 'src/app/components/modals/edit-hospital/edit-hospital.component';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})

export class HospitalsComponent implements OnInit {

  constructor(private _hospital: HospitalService,
              public dialog: MatDialog) { }

  hospitals: Hospital[] = [];
  from: number = 0;
  totalHospitals: number = 0;
  searching: boolean = false;
  limit: number;
  options: ScrollToOptions;

  ngOnInit() {
    this.limit = LIMIT;
    this.getHospitals();
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
          this._hospital.searchHospital(res)
            .subscribe( (hospitals: Hospital[]) => {
              this.hospitals = hospitals;
              this.searching = true;
            });
        } else {
          this.getHospitals();
          this.searching = false;
          return false;
        }
      });
  }

  getHospitals(amount?:number){
    if (amount == LIMIT && this.totalHospitals - this.from == 1 && this.from !=0) {
      this.from = (this.totalHospitals - 1 ) - amount;
    }
      this._hospital.getHospitalList(this.from)
       .subscribe((res:any) => {
         this.hospitals = res.hospitals;
         this.totalHospitals = res.hospitalCount;
       });
  }

  editHospital(hospital:Hospital){
    const dialogRef = this.dialog.open(EditHospitalComponent,{data:hospital});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
    console.log("cerro dialog")
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getHospitals();
        }, 1500)
      }  // End of If (result)
    });
  }

  openHospitalDialog(){
    const dialogRef = this.dialog.open(CreateHospitalComponent,{});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
    console.log("cerro dialog")
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getHospitals();
        }, 1500)
      }  // End of If (result)
    });
  }

  openImageDialog(hospital:Hospital){
    let data = {
      _id: hospital._id,
      collection: 'Hospital'
    }
    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
    console.log("cerro dialog")
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getHospitals();
        }, 1500)
      }  // End of If (result)
    });
  }

  deleteHospital(hospital:Hospital){
     Swal({
       title: "¿Estás seguro?",
       text: `Estás apunto de borrar a ${hospital.name}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Sí'
       })
      .then(res => {
        if (res.value){
          this._hospital.deleteHospital(hospital._id)
           .subscribe(() => {
             Swal('Operación aceptada', 'Usuario borrado', 'info');
             this.getHospitals(LIMIT);
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
    if (from >= this.totalHospitals || from < 0) return false;
    this.from += value;
    this.getHospitals();
  }

}
