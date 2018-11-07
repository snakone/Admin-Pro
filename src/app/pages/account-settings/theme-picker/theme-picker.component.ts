import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

  constructor(private _settings: SettingsService) { }

  ngOnInit() {
    this.applyCheckMark();  // Check Current Theme and set Mark on it
  }

  changeTheme(theme: string, element: HTMLElement){
    this._settings.setSettings(theme);  // Set Theme to localStorage
    this.checkThemeMark(element);
  }

  checkThemeMark(theme: HTMLElement){  // Apply Current Theme Mark into the selected Theme
    let selectors: any = document.getElementsByClassName("selector")  // Get All Buttons
    for (let ref of selectors){
      ref.classList.remove('working');
    }
    theme.classList.add('working');
  }

  applyCheckMark(){  // Same as checkThemeMark() but OnInit
    let selectors: any = document.getElementsByClassName("selector")
    let theme = this._settings.settings.theme;
    for (let ref of selectors){
      if (ref.getAttribute('data-theme') === theme){  // Custom HTML Attribute
        ref.classList.add('working')
        break;
      }
    }
  }

}
