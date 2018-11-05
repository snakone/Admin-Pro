import { Component } from '@angular/core';
import { SettingsService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Admin Pro';

  constructor(public _settings: SettingsService){
    // Just with an Instance it Loads the Settings
    // because app.component construct everytime the App is created
  }
}
