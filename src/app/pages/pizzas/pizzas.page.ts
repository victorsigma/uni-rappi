import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.page.html',
  styleUrls: ['./pizzas.page.scss'],
})
export class PizzasPage implements OnInit {
  pizzas=[
     {
    "name": "Peperoni Rebanada",
    "price": 30,
    "image": "https://t3.ftcdn.net/jpg/08/26/33/92/240_F_826339292_ZNp4KLx6AnOAV94hk5nVjvhC29cTOPy8.jpg"
  },
  {
    "name": "Hawaiana Rebanada",
    "price": 25,
    "image": "https://t3.ftcdn.net/jpg/03/09/77/10/240_F_309771080_keIjKJp5zZsw5JpeO8zQYpB291CQSTG2.jpg"
  },
  {
    "name": "Mexicana Rebanada",
    "price": 45,
    "image": "https://t4.ftcdn.net/jpg/08/06/68/75/240_F_806687509_DRjUqxRLppjAlK1EhavCTn7vZ4LWCdq2.jpg"
  },
  {
    "name": "Especial Rebanada",
    "price": 50,
    "image": "https://t3.ftcdn.net/jpg/08/21/58/62/240_F_821586215_VpTfBKOBesRst1dG9JNuI8qg2WSYE5rr.jpg"
  },
  {
    "name": "Peperoni Grande",
    "price": 150,
    "image": "https://t3.ftcdn.net/jpg/09/73/32/76/240_F_973327667_AWjgsHOkc5G56YR7NWbl8c2eNEvJdr0K.jpg"
  },
  {
    "name": "Hawaiana Grande",
    "price": 180,
    "image": "https://t4.ftcdn.net/jpg/09/68/31/73/240_F_968317325_ACIdXpaRYANAPGftjocRviHsO01NISWO.jpg"
  },
  {
    "name": "Mexicana Grande",
    "price": 200,
    "image": "https://t4.ftcdn.net/jpg/08/55/23/91/240_F_855239197_u38vQ2xsceacYyYdsJxuuSRsvYELtX8E.jpg"
  },
  {
    "name": "Especial Grande",
    "price": 220,
    "image": "https://t4.ftcdn.net/jpg/07/42/56/91/240_F_742569122_3or3jW78QZ2tuqHu5jX5B7Njbf524d50.jpg"
  }
]

  ngOnInit() {
  }

  constructor(private alertController: AlertController) {}

  async presentAlert(pizza: { name: string; price: number; image: string }) {
    const alert = await this.alertController.create({
      header: `Pizza ${pizza.name}`,
      subHeader: `Precio: $${pizza.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1 para que no
          value: 1 // Valor por defecto
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
              console.log(`Se agregaron ${quantity} unidades de la pizza ${pizza.name}`);
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
