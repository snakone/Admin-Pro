import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrls: ['./search-doctors.component.scss']
})

export class SearchDoctorsComponent implements OnInit {

  @Input() doctors: Doctor[];

  constructor() { }

  ngOnInit() {
  }

}
