import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  getUserById(userId: number) {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userId: number, data: any) {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, data);
  }

}
