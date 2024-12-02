import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent  implements OnInit {
  @Input() product: any;
  cantidad: number = 1;


  constructor(private modalController: ModalController, private carService: CarService) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  aumentarProducto() {
    if(this.cantidad < 50){
      this.cantidad += 1;
    }
  }

  reducirProducto() {
    if(this.cantidad > 1){
      this.cantidad -= 1;
    }
  }

  resetearContador() {
    this.cantidad = 1;
  }

  addToCar() {
    for(let i = 1; i <= this.cantidad; i++){
      this.carService.addToCar(this.product);
    }
    this.modalController.dismiss();

    this.resetearContador();
  }

  ngOnInit() {}

}
