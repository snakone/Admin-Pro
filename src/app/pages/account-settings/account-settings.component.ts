import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/services.index';
import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})

export class AccountSettingsComponent implements OnInit {

  user: User;

  constructor(private _user: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.user = this._user.user;
  }

  openDialog(){
    let data = {
      _id: this.user._id,
      collection: 'User'
    }
    this.dialog.open(EditPictureComponent,{data:data});  // New Dialog
  }

}
