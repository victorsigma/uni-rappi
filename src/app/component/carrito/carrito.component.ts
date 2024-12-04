import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent  implements OnInit {
  products: any[] = [];
  totalPrice: number = 0;

  constructor(private modalController:ModalController, private carService:CarService) { 
    this.products = carService.getCarItems();
    console.log(this.products);

    this.carService.totalPrice$.subscribe((price) => {
      this.totalPrice = price;
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  eliminarProducto(product: any) {
    this.carService.removeFromCart(product);
  }

  ngOnInit() {}

}
