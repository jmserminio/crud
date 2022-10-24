import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://jsonplaceholder.typicode.com/users/'

  constructor(private http: HttpClient) { }

  getUserRequest() {
    return this.http.get<IUser[]>(this.url)
      .pipe(map((res: IUser[]) => {
        return res;
      }))
  }

  viewUserRequest(id: string) {
    return this.http.get(this.url + id)
  }

  createUserRequest(data: IUser) {
    return this.http.post<IUser>(this.url, data)
      .pipe(map((res: IUser) => {
        return res;
      }))
  }

  updateUserRequest(data: IUser) {
    return this.http.put<IUser>(this.url + data.id, data)
      .pipe(map((res: IUser) => {
        return res;
      }))
  }

  deleteUserRequest(id: string) {
    const result = this.http.delete(this.url + id)

    return new Promise((resolve) => {
      result.subscribe(res => {
        resolve(res)
      })

    });
  }
}
