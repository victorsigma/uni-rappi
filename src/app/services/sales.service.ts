import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiModels';
import { TokenService } from './token/token.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  async completarCompra(productos: {id: number, quantity: number}[]): Promise<Observable<ApiResponse<any>>> {

    const user = await this.tokenService.getUserId();

    const observable$ = this.http.post<ApiResponse<any>>(`${this.apiUrl}/sales`, {user_id: user, products: productos});

    return observable$;
  }

  async obtenerOrdenes(): Promise<Observable<ApiResponse<any>>> {

    const user = await this.tokenService.getUserId();

    const observable$ = this.http.get<ApiResponse<any>>(`${this.apiUrl}/sales/user/${user}`);

    return observable$;
  }
}
