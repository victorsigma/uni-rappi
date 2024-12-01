import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(data: { usernameOrEmail: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  logout() {
   this.tokenService.logOut();
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }
}
