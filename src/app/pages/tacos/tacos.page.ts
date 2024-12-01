import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tacos',
  templateUrl: './tacos.page.html',
  styleUrls: ['./tacos.page.scss'],
})
export class TacosPage implements OnInit {

   menu = [
    {
      "name": "Tacos",
      "image":"https://t4.ftcdn.net/jpg/09/66/73/59/240_F_966735986_TkgN0ueuhZoNcBBUQlsSNsMpZK5DoAu1.jpg"        
    },
     {
      "name": "Tortas",
      "image":"https://t4.ftcdn.net/jpg/03/66/34/87/240_F_366348718_qqoTPPaYh5hEfdUDG8kZUHoE91XETYdA.jpg"       
    },
     {
      "name": "Quesadillas",
      "image":"https://t3.ftcdn.net/jpg/05/97/08/60/240_F_597086001_dSkCB93ZHgVZV5RrITJjswqmmxcwwG4G.jpg"        
    }
  ];

 tacos = [
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

  async presentAlert(postre: { name: string; price: number; }) {
    const alert = await this.alertController.create({
      header: `${postre.name}`,
      subHeader: `Precio: $${postre.price}`,
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
              console.log(`Se agregaron ${quantity} unidades de la quesadilla ${postre.name}`);
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
