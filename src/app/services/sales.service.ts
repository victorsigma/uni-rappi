import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiModels';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = "http://localhost:3000/"
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  async completarCompra(productos: {id: number, quantity: number}[]): Promise<Observable<ApiResponse<any>>> {

    const user = await this.tokenService.getUserId();

    const observable$ = this.http.post<ApiResponse<any>>(`${this.apiUrl}sales`, {user_id: user, products: productos});

    return observable$;
  }
}
