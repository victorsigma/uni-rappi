import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; 'jwt-decode';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor() {}

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public logOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    location.reload();
  }

  public isLogged(): boolean {
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }

  private decodeToken(): any | null {
    const token = this.getToken();
    if (!token) {
      console.warn('No se encontró token para decodificar.');
      return null;
    }
  
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token:');
      return null;
    }
  }

  public getRole(): string | null {
    if (!this.isLogged()) {
      return '';
    }
    const decoded = this.decodeToken();
    return decoded ? decoded['role'] : null;
  }

  public getUsername(): string | null {
    if (!this.isLogged()) {
      return '';
    }
    const decoded = this.decodeToken();
    return decoded ? decoded['username'] : null;
  }

  public getUserId(): number | null {
    if (!this.isLogged()) {
      return null;
    }
    const decoded = this.decodeToken();
    return decoded ? decoded['id'] : null;
  }

  public isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  public isUser(): boolean {
    return this.getRole() === 'user';
  }

  public isVendor(): boolean {
    return this.getRole() === 'vendedor';
  }
}
