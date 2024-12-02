import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carItems: any[] = [];
  private totalPrice = new BehaviorSubject<number>(0); // Observable para el precio total

  // Observable que otros componentes pueden suscribirse
  totalPrice$ = this.totalPrice.asObservable();

  constructor() {
    this.loadCarFromLocalStorage();
  }

  // Agregar producto al carrito
  addToCar(producto: any) {
    this.carItems.push(producto);
    console.log('Producto agregado: ', producto);
    this.saveCarToLocalStorage();
    this.updateTotalPrice();
  }

  // Obtener los productos del carrito
  getCarItems() {
    this.updateTotalPrice();
    return this.carItems;
  }

  // Eliminar un producto específico del carrito
  removeFromCart(product: any) {
    const index = this.carItems.indexOf(product);
    if (index > -1) {
      this.carItems.splice(index, 1); // Elimina el producto del array
    }
    this.updateTotalPrice();
  }

  // Calcular el precio total
  private updateTotalPrice() {
    const total = this.carItems.reduce((sum, carItem) => sum + carItem.price, 0);
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
