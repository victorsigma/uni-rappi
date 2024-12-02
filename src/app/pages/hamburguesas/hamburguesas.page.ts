import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hamburguesas',
  templateUrl: './hamburguesas.page.html',
  styleUrls: ['./hamburguesas.page.scss'],
})
export class HamburguesasPage implements OnInit {
  menuprincipal = [
    {
      "name": "Tortas y Sandwich",
      "image":"https://t4.ftcdn.net/jpg/10/41/45/31/240_F_1041453140_mK6SUCsvLm6v7exsTl42IefwzrgwhMZN.jpg"        
    },
     {
      "name": "Quesadillas",
      "image":"https://t3.ftcdn.net/jpg/04/84/81/02/240_F_484810246_0NaToWWBW5mgnsZ1XEU4dmu77gH9dpP0.jpg"       
    },
     {
      "name": "Hamburguesas",
      "image":"https://t4.ftcdn.net/jpg/02/44/61/19/240_F_244611927_yrh0ZIYwOGTDurVnCMAt7Cq8DR4sBkB0.jpg"
    }
  ];

  menu =[
        {
          "name": "Hamburguesa Sencilla",
          "price": 50,
          
        },
        {
          "name": "Hamburguesa Clásica",
          "price": 45,
          
        },
        {
          "name": "Hamburguesa Pollo",
          "price": 45,
          
        },
        {
          "name": " HamburguesaHawaiana",
          "price": 50,
          
        },
        {
          "name": "Hamburguesa BBQ",
          "price": 50,
          
        },
        {
          "name": "Quesadilla Salchicha",
          "price": 35,
          
        },
        {
          "name": "Quesadilla Jamón",
          "price": 30,
          
        },
        {
          "name": "Quesadilla Chorizo",
          "price": 30,
          
        },
        {
          "name": "Quesadilla Milanesa",
          "price": 30,
          
        },
        {
          "name": "Quesadilla Choriqueso",
          "price": 30,
          
        },
        {
          "name": "Quesadilla Arrachera",
          "price": 30,
          
        },
        {
          "name": "Especiales Cubana",
          "price": 45,
          
        },
        {
          "name": "Especiales Norteña",
          "price": 45,
          
        },
        {
          "name": "Especiales Águila",
          "price": 45,
          
        },
        {
          "name": "Especiales UTNG",
          "price": 45,
          
        }
  ]

  ngOnInit() {
  }
  constructor(private alertController: AlertController) {}

  async presentAlert(item: { name: string; price: number; }) {
    const alert = await this.alertController.create({
      header: `Producto: ${item.name}`,
      subHeader: `Precio: $${item.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1
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
              console.log(`Se agregaron ${quantity} unidades de ${item.name}`);
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
