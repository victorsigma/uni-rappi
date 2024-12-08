import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'AuthToken';

  constructor() {}

  public async setToken(token: string): Promise<void> {
    await Preferences.set({ key: this.TOKEN_KEY, value: token });
  }

  public async removeToken(): Promise<void> {
    await Preferences.remove({ key: this.TOKEN_KEY });
  }

  public async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.TOKEN_KEY });
    return value;
  }

  public logOut(): void {
    this.removeToken();
    location.reload();
  }

  public async isLogged(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  }

  private async decodeToken(): Promise<any | null> {
    const token = await this.getToken();
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

  public async isTokenValid(): Promise<boolean> {
    const decoded = await this.decodeToken();
    if (!decoded) {
      return false; // Token no válido o no existe
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp && decoded.exp > currentTime; // Verifica que el token no haya expirado
  }

  public async getRole(): Promise<string | null> {
    if (!(await this.isLogged())) {
      return null;
    }
    const decoded = await this.decodeToken(); // Usamos await aquí
    return decoded ? decoded['role'] : null;
  }

  public async getUsername(): Promise<string | null> {
    if (!(await this.isLogged())) {
      return null;
    }
    const decoded = await this.decodeToken(); // Usamos await aquí
    return decoded ? decoded['username'] : null;
  }

  public async getUserId(): Promise<number | null> {
    if (!(await this.isLogged())) {
      return null;
    }
    const decoded = await this.decodeToken(); // Usamos await aquí
    return decoded ? decoded['id'] : null;
  }

  public async isAdmin(): Promise<boolean> {
    return (await this.getRole()) === 'admin';
  }

  public async isUser(): Promise<boolean> {
    return (await this.getRole()) === 'user';
  }

  public async isVendor(): Promise<boolean> {
    return (await this.getRole()) === 'vendedor';
  }
}
