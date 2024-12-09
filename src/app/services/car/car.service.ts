import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { CartProduct, CartProductView, ShoppingCartResponse } from 'src/app/models/apiModels';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carItems: any[] = [];
  private totalPrice = new BehaviorSubject<number>(0); // Observable para el precio total

  // Observable que otros componentes pueden suscribirse
  totalPrice$ = this.totalPrice.asObservable();

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.loadCarFromLocalStorage();
  }

  // Agregar producto al carrito
  public async addToCar(product: { id: number, quantity: number }): Promise<any> {
    this.carItems.push(product);
    console.log('Producto agregado: ', product);
    this.saveCarToLocalStorage();

    const user = await this.tokenService.getUserId();
    const observable$ = this.http.patch(`${this.apiUrl}/shopping-cart/${user}`, { product });

    return firstValueFrom(observable$);
  }

  // Obtener los productos del carrito
  async getCarItems(): Promise<Observable<any>> {
    const user = await this.tokenService.getUserId()
    const observable$ = this.http.get<ShoppingCartResponse>(`${this.apiUrl}/shopping-cart/${user}`);

    observable$.subscribe({
      complete: () => { },
      next: (value) => {
        this.carItems = value.data.cartProducts.map((element: CartProduct) => {
          return { productname: element.product.productname }
        })


        this.updateTotalPrice(value.data.balance);
      },
      error: () => { }
    })
    return observable$;
  }

  // Eliminar un producto específico del carrito
  async removeFromCart(product: CartProductView): Promise<Observable<ShoppingCartResponse>> {
    const index = this.carItems.indexOf(product);

    const user = await this.tokenService.getUserId();

    const producto = {
      product: {
        id: product.id,
      }
    }
    const observable$ = this.http.delete<ShoppingCartResponse>(`${this.apiUrl}/shopping-cart/${user}`, { body: producto },);
    if (index > -1) {
      this.carItems.splice(index, 1); // Elimina el producto del array
    }
    //this.updateTotalPrice();

    return observable$;
  }

  // Calcular el precio total
  private updateTotalPrice(total: number) {
    this.totalPrice.next(total); // Actualizar el observable
  }

  private saveCarToLocalStorage() {
    localStorage.setItem('carItems', JSON.stringify(this.carItems));
  }

  private loadCarFromLocalStorage() {
    const storageCar = localStorage.getItem('carItems');
    if (storageCar) {
      this.carItems = JSON.parse(storageCar);
    }
  }
}
