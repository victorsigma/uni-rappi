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

  deleteUser(userId: number) {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
  
  uploadPhoto(userId: number, formData: FormData) {
    return this.http.patch(`${this.apiUrl}/users/${userId}/photo`, formData);
  }

  removePhoto(userId: number) {
    return this.http.delete(`${this.apiUrl}/users/${userId}/photo`);
  }

  getWallet(userId: number) {
    return this.http.get(`api/wallet/${userId}`);
  }

}
