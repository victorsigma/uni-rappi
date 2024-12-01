import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {
   menu = [
    {
      "name": "Pasteles",
      "image":"https://t4.ftcdn.net/jpg/09/74/57/55/240_F_974575590_8t5c2410HbHWayDu1kaNaVnvyCEvbr08.jpg"        
    },
     {
      "name": "Cafe",
      "image":"https://t4.ftcdn.net/jpg/10/14/44/55/240_F_1014445518_s9yTdxHxBmIj1YMREhuceGk6iLUht7PS.jpg"       
    },
     {
      "name": "Pay",
      "image":"https://t3.ftcdn.net/jpg/09/21/57/90/240_F_921579061_AmLEPqf4hFkMwQFt7UHfehelBw5YdZUI.jpg"
    },
     {
      "name": "Frappe",
      "image":"https://t4.ftcdn.net/jpg/02/96/03/41/240_F_296034153_k1R4cnG7DDuioTbJDrCOA8KF0X1yOEpy.jpg"     
    },
     {
      "name": "Cheesecake",
      "image":"https://t3.ftcdn.net/jpg/03/91/03/02/240_F_391030291_AgLpMcp3CPkbsinsCakMknQcHAbraNIb.jpg"       
    }
  ];

 postres = [
  { "name": "Flan Napolitano", "price": 30 },
  { "name": "Arroz con Leche", "price": 20 },
  { "name": "Tarta de Limón", "price": 35 },
  { "name": "Churros con Chocolate", "price": 25 },
  { "name": "Torta de Elote", "price": 28 },
  { "name": "Pastel Tres Leches", "price": 40 },
  { "name": "Gelatina de Mosaico", "price": 18 },
  { "name": "Helado Artesanal", "price": 30 },
  { "name": "Cajeta con Crema", "price": 22 },
  { "name": "Dulce de Leche con Pan", "price": 18 }
];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async presentAlert(taco: { name: string; price: number; }) {
    const alert = await this.alertController.create({
      header: `${taco.name}`,
      subHeader: `Precio: $${taco.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1 para que no sea negativo
          value: 1, // Valor por defecto
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
              console.log(`Se agregaron ${quantity} unidades de la quesadilla ${taco.name}`);
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
