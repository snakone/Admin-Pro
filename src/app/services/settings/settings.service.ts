import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  settings: Settings = {
    themeURL: "assets/css/colors/default.css",
    theme: "default"
  }

  constructor(@Inject(DOCUMENT) private _document) {
      this.loadSettings();
   }

  saveSettings(){
    localStorage.setItem('setting', JSON.stringify(this.settings))
  }

  loadSettings(){
    if (localStorage.getItem('setting')){
      this.settings = JSON.parse(localStorage.getItem('setting'))
      this.setSettings(this.settings.theme);
    } else {
      this.setSettings(this.settings.theme);
    }
  }

  setSettings(color: string){
    let themeURL = `assets/css/colors/${color}.css`;
    this._document.getElementById('theme').setAttribute('href', themeURL)
    this.settings.theme = color;
    this.settings.themeURL = themeURL;
    this.saveSettings();
  }

}

interface Settings {
  themeURL: string;
  theme: string;
}
