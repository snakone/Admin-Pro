import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/services.index';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2'

import { MatDialog } from '@angular/material';  // Material Dialog
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  constructor(private _user: UserService,
              public dialog: MatDialog) { }

  users: User[] = [];
  from: number = 0;
  totalUsers: number = 0;
  searching: boolean = false;

  ngOnInit() {
    this.getUsers();
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
          this.searching = true;
          this._user.searchUser(res)
            .subscribe( (users: User[]) => {
              this.users = users;
            });
        } else {
          this.getUsers();
          this.searching = false;
          return;
        }
      });
  }

  getUsers(amount?:number){
    if (amount == 10 && this.totalUsers - this.from == 1) {
      this.from = (this.totalUsers - 1 ) - amount;
    }
      this._user.getUserList(this.from)
       .subscribe((res:any) => {
         this.users = res.users;
         this.totalUsers = res.userCount;
       });
  }

  saveUser(user:User){
    console.log(user)
    this._user.updateUser(user)
     .subscribe(() => {
       Swal('Operación aceptada', 'Usuario editado', 'info');
     })
  }

  openDialog(user:User){
    const dialogRef = this.dialog.open(ImageDialogComponent,{data:user});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
          this.getUsers();
      }  // End of If (result)
    });
  }

  deleteUser(user:User){
    if (user._id == this._user.user._id){
       Swal('Error', 'No puedes borrarte a ti mismo!', 'error');
       return false;
    }
     Swal({
       title: "¿Estás seguro?",
       text: `Estás apunto de borrar a ${user.name}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Sí'
       })
      .then(res => {
        if (res.value){
          this._user.deleteUser(user._id)
           .subscribe(() => {
             Swal('Operación aceptada', 'Usuario borrado', 'info');
             this.getUsers(10);
           });
        }
      });
  }

  changeFrom(value: number){
    let rows = document.getElementById("rows").classList;
    if (value === 10){
        rows.add("slideOutLeft");
        rows.remove("slideInRight","slideInLeft");
        setTimeout(()=> {
          rows.remove("slideOutLeft");
          rows.add("slideInRight");
        }, 1000);
    }
    else if (value === -10) {
        rows.add("slideOutRight");
        rows.remove("slideInRight", "slideInLeft");
        setTimeout(()=> {
          rows.remove("slideOutRight");
          rows.add("slideInLeft");
        }, 1000);
    }

    let from = this.from + value;
    if (from >= this.totalUsers || from < 0) return false;
    this.from += value;
    this.getUsers();
  }

}
