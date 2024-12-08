import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-tacos',
  templateUrl: './tacos.page.html',
  styleUrls: ['./tacos.page.scss'],
})
export class TacosPage implements OnInit {

  menu = [
    {
      "name": "Tacos",
      "image": "https://t4.ftcdn.net/jpg/09/66/73/59/240_F_966735986_TkgN0ueuhZoNcBBUQlsSNsMpZK5DoAu1.jpg"
    },
    {
      "name": "Tortas",
      "image": "https://t4.ftcdn.net/jpg/03/66/34/87/240_F_366348718_qqoTPPaYh5hEfdUDG8kZUHoE91XETYdA.jpg"
    },
    {
      "name": "Quesadillas",
      "image": "https://t3.ftcdn.net/jpg/05/97/08/60/240_F_597086001_dSkCB93ZHgVZV5RrITJjswqmmxcwwG4G.jpg"
    }
  ];

  tacos: Array<{ "productname": string, "price": number, "photoUrl": string, "stock": string }> = []

  constructor(private alertController: AlertController, private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.buscarPorMenu(4).subscribe({
      complete: () => { },
      next: (value: any) => {
        console.log(value);
        this.tacos = value.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  async presentAlert(taco: { "productname": string, "price": number, "photoUrl": string, "stock": string }) {
    const alert = await this.alertController.create({
      header: `${taco.productname}`,
      subHeader: `Precio: $${taco.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1 para que no sea negativo
          value: 1, // Valor por defecto
          max: taco.stock
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
              console.log(`Se agregaron ${quantity} unidades de la quesadilla ${taco.productname}`);
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
