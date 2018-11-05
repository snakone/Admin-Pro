import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})

export class BreadCrumsComponent implements OnInit {
  // Navigation Structure: Home - Content - Page
  content: string;
  page: string;

  constructor(private router: Router,
              private _title: Title,
              private _meta: Meta) {  // On the Constructor. Need Router Info before Anything!

    this.getRouteData()
      .subscribe(res => {
        this.page = res.page;
        this.content = res.content;
        this._title.setTitle(this.page)  // Set HTML Title TAG
        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.page
        }
        this._meta.updateTag(metaTag);  // Set <head> HTML <meta> TAG
      });
  }

  ngOnInit() {
}

  getRouteData(){  // Load Data from Router
    return this.router.events.pipe(  // Router Events = Observable
      filter(event => event instanceof ActivationEnd ),  // Filter ActivationEnd Events
      filter((event: ActivationEnd) => event.snapshot.firstChild === null), // Filter Child Router
      map((event: ActivationEnd) => event.snapshot.data) // Only need the Router Data
    );
  }

}
