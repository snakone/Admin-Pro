import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  users: User[]=[];
  hospitals: Hospital[]=[];
  doctors: Doctor[]=[];

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params
     .subscribe(params => {
       this.searchValue(params['value']);
     });
  }

  searchValue(value: string){
    this.http.get(URL_SERVICES + '/search/all/' + value)
     // .pipe(map((res:any)=> {
     //   return res.users.concat(res.doctors).concat(res.hospitals);
     // }))
     .subscribe((res:any) => {
       this.users = res.users;
       this.hospitals = res.hospitals;
       this.doctors = res.doctors;
     })
  }

}
