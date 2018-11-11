import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})

export class SearchUsersComponent implements OnInit {

  @Input() users: User[];

  constructor() { }

  ngOnInit() {
  }

}
