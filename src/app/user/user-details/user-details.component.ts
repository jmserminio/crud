import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { IUser } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnChanges {

  @Input() userData: IUser | null = null
  @Output() editedUser = new EventEmitter()

  userList: IUser[] = []

  constructor(
    private api: ApiService
  ) {}

  ngOnInit(): void {

    this.getUser()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.userData) {
      return
    }
    if(changes.userData.currentValue.isEdit) {
      this.userList.map(user => {
        if(user.id === this.userData?.id) {
          user.name = this.userData?.name!
          user.email = this.userData?.email!
          user.phone = this.userData?.phone!
        }
      })
    }
    if(changes.userData.currentValue.isCreate) {
        this.userList.push(this.userData as IUser)
    }
  }

  getUser() {
    this.api.getUserRequest().subscribe(res => {
      this.userList = res
    })
  }

  editUser(user: IUser) {
    this.editedUser.emit(user)
  }

  async deleteUser(user: IUser, index: number) {
    try {
      await this.api.deleteUserRequest(user.id!)
    } catch (error) {
      return
    }
    
    this.userList.splice(index, 1)

    alert("Record deleted successfully!")
  }

}
