import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CarritoComponent } from 'src/app/component/carrito/carrito.component';
import { CarService } from 'src/app/services/car/car.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-hamburguesas',
  templateUrl: './hamburguesas.page.html',
  styleUrls: ['./hamburguesas.page.scss'],
})
export class HamburguesasPage implements OnInit {
  menu: Array<{ "id": number, "productname": string, "price": number, "photoUrl": string, "stock": string }> = []

  ngOnInit() {
    this.productosService.buscarPorMenu(7).subscribe({
      complete: () => { },
      next: (value: any) => {
        console.log(value);
        this.menu = value.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  constructor(private alertController: AlertController, private productosService: ProductosService, private modalController: ModalController,
    private carService: CarService) { }

  async presentAlert(item: { id: number, productname: string; price: number; photoUrl: string, stock: string }) {
    const alert = await this.alertController.create({
      header: `Producto: ${item.productname}`,
      subHeader: `Precio: $${item.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1
          value: 1, // Valor por defecto
          max: item.stock
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El usuario canceló');
          },
        },
        {
          text: 'Agregar',
          handler: async (data) => {
            const quantity = data.quantity;
            if (quantity > 0) {
              console.log(`Se agregaron ${quantity} unidades de ${item.productname}`);
              (await this.carService.addToCar({ id: item.id, quantity }));
            } else {
              console.log('Cantidad inválida');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async openCarrito() {
    const modal = await this.modalController.create({
      component: CarritoComponent, // No especificamos un componente aquí
      cssClass: 'full-modal', // Estilos personalizados (opcional)
      backdropDismiss: true,  // Permitir cerrar al hacer clic fuera
      breakpoints: [1], // Puntos de ruptura para el tamaño del modal (10%, 50%, 90%)
      initialBreakpoint: 1, // Comienza el modal en 50% de la altura
      handle: false, // Activa el control para arrastrar el modal
    });

    await modal.present();
  }
}
