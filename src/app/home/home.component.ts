import { Component, OnInit } from '@angular/core';
import { IUser } from '../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  userData: IUser | null = null

  constructor() {}

  ngOnInit(): void {

  }

  toUserDetails($event: IUser) {
    this.userData = $event
  }

}
