import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CartProduct, CartProductView } from 'src/app/models/apiModels';
import { CarService } from 'src/app/services/car/car.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  products: CartProductView[] = [];
  totalPrice: number = 0;

  constructor(private alertController: AlertController, private modalController: ModalController,
    private carService: CarService, private saleService: SalesService) {

    this.carService.totalPrice$.subscribe((price) => {
      this.totalPrice = price;
    });
  }

  async obtenerCarrito() {
    (await this.carService.getCarItems()).subscribe({
      complete: () => { },
      next: (value) => {
        this.products = value.data.cartProducts.map((element: CartProduct) => {
          return { ...element.product, quantity: element.quantity, total: element.total }
        })
      },
      error: () => { }
    })

  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: `Comprar`,
      subHeader: `Total a pagar: $${this.totalPrice}`,
      message: '¿Quiere completar la compra?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El usuario canceló');
          },
        },
        {
          text: 'Pagar',
          handler: async (data) => {
            const productos = this.products.map(({id, quantity}) => {
              return { id, quantity} ;
            });
            (await this.saleService.completarCompra(productos)).subscribe({
              complete: () => { },
              next: async (value) => {
                console.log(value);
                if(value.data.error) {
                  await this.presentAlertError(value.message);
                } else {
                  await this.presentAlertSuccess();
                  await this.obtenerCarrito();
                }
              },
              error: async (error) => {
                
              }
            })
          },
        },
      ],
    });

    await alert.present();
  }


  async presentAlertSuccess() {
    const alert = await this.alertController.create({
      header: `Comprar Completada`,
      subHeader: `Total a pagado: $${this.totalPrice}`,
      buttons: [
        {
          text: 'Continuar',
          handler: async (data) => {
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertError(error: string) {
    const alert = await this.alertController.create({
      header: `Error`,
      subHeader: error,
      buttons: [
        {
          text: 'Continuar',
          handler: async (data) => {
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarProducto(product: CartProductView) {
    (await this.carService.removeFromCart(product)).subscribe({
      complete: () => { },
      next: async () => {
        await this.obtenerCarrito();
      },
      error: () => { }
    })
  }

  async ngOnInit() {
    await this.obtenerCarrito();
  }
}
