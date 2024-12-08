import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private apiUrl = "http://localhost:3000/"
  constructor(private http: HttpClient) { }


  public buscarPorMenu(menuId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}products/menu/${menuId}`);
  }
}
