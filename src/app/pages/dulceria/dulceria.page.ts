import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dulceria',
  templateUrl: './dulceria.page.html',
  styleUrls: ['./dulceria.page.scss'],
})
export class DulceriaPage implements OnInit {
  menu = [
     {
      "name": "Pepsi",
      "image":"https://t3.ftcdn.net/jpg/02/94/41/16/240_F_294411654_B9633b7jOzdEhitq2UapDNrpkbN7OIlQ.jpg"
    },
     {
      "name": "Sabritas",
      "image":"https://t3.ftcdn.net/jpg/04/32/47/44/240_F_432474430_M7dOUIlPkT1btWXXZXCIUaPgyeu4Rznd.jpg"       
    },
     {
      "name": "Coca-Cola",
      "image":"https://t4.ftcdn.net/jpg/09/00/31/59/240_F_900315931_IQ4JRrOgOVEO7XfmvwRPu8CPtdkUNWTL.jpg"
    },
    {
      "name": "Galletas",
      "image":"https://t4.ftcdn.net/jpg/08/00/67/09/240_F_800670998_S6cRmKZ6pmcW7zAathiJJbfU3582Fq2z.jpg"        
    },
     {
      "name": "Paletas",
      "image":"https://t4.ftcdn.net/jpg/01/04/92/63/240_F_104926387_PFNm6Yh0dSrVNjxTtiGaIexujL3iDuZS.jpg"       
    },
     {
      "name": "Chocolates",
      "image":"https://t4.ftcdn.net/jpg/03/66/44/83/240_F_366448303_N5CdguxcukypuEfgNzTzJu46XbrIobv1.jpg"       
    }
  ];

  dulces = [
    { "name": "Coca-Cola", "price": 15 },
    { "name": "Sprite", "price": 15 },
    { "name": "Pepsi", "price": 15 },
    { "name": "Sabritas Clásicas", "price": 10 },
    { "name": "Chester", "price": 12 },
    { "name": "Ruffles", "price": 13 },
    { "name": "Galletas Oreo", "price": 20 },
    { "name": "Galletas Emperador", "price": 18 },
    { "name": "Galletas Marías", "price": 10 },
    { "name": "Chocolate Hershey's", "price": 25 },
    { "name": "Chocolate Snickers", "price": 20 },
    { "name": "Chocolate M&M's", "price": 18 },
    { "name": "Chocolate Mars", "price": 22 }
  ];


  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async presentAlert(dulceria: { name: string; price: number; }) {
    const alert = await this.alertController.create({
      header: `${dulceria.name}`,
      subHeader: `Precio: $${dulceria.price}`,
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
              console.log(`Se agregaron ${quantity} unidades de la quesadilla ${dulceria.name}`);
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
