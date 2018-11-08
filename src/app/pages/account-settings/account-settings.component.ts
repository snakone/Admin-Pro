import { Component, OnInit} from '@angular/core';
import { SettingsService } from 'src/app/services/services.index';

import { MatDialog } from '@angular/material';  // Material Dialog
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})

export class AccountSettingsComponent implements OnInit {

  constructor(private _settings: SettingsService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  openDialog(){
    const dialogRef = this.dialog.open(ImageDialogComponent,{});  // New Dialog

  }

}
