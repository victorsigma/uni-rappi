import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  public buscarPorMenu(menuId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/menu/${menuId}`);
  }
}
