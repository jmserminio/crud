import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { IUser } from 'src/app/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {

  isEdit = false

  @Output() addedUser = new EventEmitter()
  @Input() editData: IUser | null = null

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.editData) {
      this.isEdit = true

      this.formValue.setValue({
        name: this.editData?.name ?? '',
        email: this.editData?.email ?? '',
        phone: this.editData?.phone ?? ''
      })
    }
    
  }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  phone = new FormControl('', [
    Validators.required
  ])

  formValue = new FormGroup({
    name: this.name,
    email: this.email,
    phone: this.phone
  })

  addUser() {

    this.api.createUserRequest(this.formValue.value as IUser).subscribe(res => {

      const createPayload = {
        ...res,
        isCreate: true
      }

      this.addedUser.emit(createPayload)

      alert("Record added successfully!")
    }, err => {
      
      alert("Something went wrong!")
    })

    
    this.formValue.reset()
  }

  editUser() {
    if(!this.editData) {
      return
    }

    const payLoad = {
      ...this.formValue.value,
      id: this.editData.id
    }
    this.api.updateUserRequest(payLoad as IUser).subscribe(res => {
      console.log(res)

      const updatePayload = {
        ...res,
        isEdit: true
      }

      this.addedUser.emit(updatePayload)

      alert("Record updated successfully!")
    }, err => {
      
      alert("Something went wrong!")
    })

    this.formValue.reset()
  }

}
