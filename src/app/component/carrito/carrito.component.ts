import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartProduct, CartProductView } from 'src/app/models/apiModels';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent  implements OnInit {
  products: CartProductView[] = [];
  totalPrice: number = 0;

  constructor(private modalController:ModalController, private carService:CarService) { 

    this.carService.totalPrice$.subscribe((price) => {
      this.totalPrice = price;
    });
  }

  async obtenerCarrito() {
    (await this.carService.getCarItems()).subscribe({
      complete: () => {},
      next: (value) => {
        this.products = value.data.cartProducts.map((element: CartProduct) => {
          return { ...element.product, quantity: element.quantity, total: element.total }
        })
      },
      error: () => {}
    })

  }

  dismissModal() {
    this.modalController.dismiss();
  }

  eliminarProducto(product: any) {
    this.carService.removeFromCart(product);
  }

  async ngOnInit() {
    await this.obtenerCarrito();
  }
}
