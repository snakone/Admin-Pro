import { Component, OnInit} from '@angular/core';
import { SettingsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})

export class AccountSettingsComponent implements OnInit {

  constructor(private _settings: SettingsService) { }

  ngOnInit() {

  }

}
