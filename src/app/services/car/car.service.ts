import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carItems: any[] = [];

  constructor() { }

  // Agregar producto al carrito
  addToCar(producto: any){

  }

  // Obtener los productos del carrito
  getCarItems(producto: any){

  }

  // Eliminar un producto específico del carrito
  removeFromCart(product: any) {
    const index = this.carItems.indexOf(product);
    if (index > -1) {
      this.carItems.splice(index, 1); // Elimina el producto del array
    }
  }


}
