import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

interface Settings {
  themeURL: string;     // assets/css/colors/Dark-blue.css
  theme: string;        // Dark-blue
}

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  settings: Settings = {  // Default Settings
    themeURL: "assets/css/colors/default.css",
    theme: "default"
  }

  constructor(@Inject(DOCUMENT) private _document) {  // Just another Way to import the HTML Document
      this.loadSettings();
   }

  saveSettings(){
    localStorage.setItem('settings', JSON.stringify(this.settings))  // JSON to String - localStorage only accepts Strings
  }

  loadSettings(){
    if (localStorage.getItem('settings')){
      this.settings = JSON.parse(localStorage.getItem('settings'))  // String to JSON - localStorage response with Strings
      this.setSettings(this.settings.theme);
    } else {
      this.setSettings(this.settings.theme);  // No Settings on localStorage? Load Default
    }
  }

  setSettings(theme: string){
    let themeURL = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', themeURL)  // <link> CSS TAG on Index.html
    this.settings.theme = theme;
    this.settings.themeURL = themeURL;
    this.saveSettings();  // All set to Save Settings
  }

}
