import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/services.index';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2'

import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { EditUserComponent } from 'src/app/components/modals/edit-user/edit-user.component';
import { LIMIT } from 'src/app/config/config';

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
  limit: number;
  options: ScrollToOptions;

  ngOnInit() {
    this.limit = LIMIT;
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
              this.searching = true;
            });
        } else {
          this.getUsers();
          this.searching = false;
          return false;
        }
      });
  }

  getUsers(amount?:number){
    if (amount == LIMIT && this.totalUsers - this.from == 1 && this.from !=0) {
      this.from = (this.totalUsers - 1 ) - amount;
    }
      this._user.getUserList(this.from)
       .subscribe((res:any) => {
         this.users = res.users;
          console.log(this.users.length)
         this.totalUsers = res.userCount;
       });
  }

  editUser(user:User){
  this.dialog.open(EditUserComponent,{data:user});  // New Dialog
  }

  openImageDialog(user:User){
    let data = {
      _id: user._id,
      collection: 'User'
    }

    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
      setTimeout(() => {   // Wait a bit to get Updated Data Again
         this.getUsers();
      }, 1500)
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
             this.getUsers(LIMIT);
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
        }, 1200);
    }
    else if (value === -LIMIT) {
        rows.add("slideOutRight");
        rows.remove("slideInRight", "slideInLeft");
        setTimeout(()=> {
          rows.remove("slideOutRight");
          rows.add("slideInLeft");
        }, 1200);
    }

    let from = this.from + value;
    if (from >= this.totalUsers || from < 0) return false;
    this.from += value;
      setTimeout(()=> {
        this.getUsers();
      this.options = {top:200, left:0, behavior: 'smooth'};
      window.scrollTo(this.options);
      }, 1000)

  }

}
