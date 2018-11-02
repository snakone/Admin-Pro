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
    this.applyCheck();
  }

  changeTheme(color: string, theme: any){
    this.checkTheme(theme)
    this._settings.setSettings(color);
  }

  checkTheme(theme: any){
    let selectors: any = document.getElementsByClassName("selector")
    for (let ref of selectors){
      ref.classList.remove('working');
    }
    theme.classList.add('working');
  }

  applyCheck(){
    let selectors: any = document.getElementsByClassName("selector")
    let theme = this._settings.settings.theme;
    for (let ref of selectors){
      if (ref.getAttribute('data-theme') === theme){
        ref.classList.add('working')
        break;
      }
    }
  }

}
