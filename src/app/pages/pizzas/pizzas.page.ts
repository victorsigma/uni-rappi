import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.page.html',
  styleUrls: ['./pizzas.page.scss'],
})
export class PizzasPage implements OnInit {
  pizzas: Array<{ "productname": string, "price": number, "photoUrl": string, "stock": string }> = []

  constructor(private alertController: AlertController, private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.buscarPorMenu(2).subscribe({
      complete: () => { },
      next: (value: any) => {
        console.log(value);
        this.pizzas = value.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  async presentAlert(pizza: { productname: string; price: number; photoUrl: string, stock: string }) {
    const alert = await this.alertController.create({
      header: `Pizza ${pizza.productname}`,
      subHeader: `Precio: $${pizza.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1 para que no
          value: 1, // Valor por defecto,
          max: pizza.stock
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
          handler: (data) => {
            const quantity = data.quantity;
            if (quantity > 0) {
              console.log(`Se agregaron ${quantity} unidades de la pizza ${pizza.productname}`);
            } else {
              console.log('Cantidad inválida');
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
