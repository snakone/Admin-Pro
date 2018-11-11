import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { UserService } from 'src/app/services/services.index';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {

  user:User;

  constructor(private _user: UserService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.user = this.data;
  }

  updateUser(){
    this._user.updateUser(this.user)
     .subscribe(() => {
       Swal('Operación aceptada', 'Usuario actualizado', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

}
