import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search-hospitals',
  templateUrl: './search-hospitals.component.html',
  styleUrls: ['./search-hospitals.component.scss']
})

export class SearchHospitalsComponent implements OnInit {

  @Input() hospitals: Hospital[];

  constructor() { }

  ngOnInit() {
  }

}
