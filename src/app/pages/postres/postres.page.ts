import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {
  menu = [
    {
      "name": "Pasteles",
      "image": "https://t4.ftcdn.net/jpg/09/74/57/55/240_F_974575590_8t5c2410HbHWayDu1kaNaVnvyCEvbr08.jpg"
    },
    {
      "name": "Cafe",
      "image": "https://t4.ftcdn.net/jpg/10/14/44/55/240_F_1014445518_s9yTdxHxBmIj1YMREhuceGk6iLUht7PS.jpg"
    },
    {
      "name": "Pay",
      "image": "https://t3.ftcdn.net/jpg/09/21/57/90/240_F_921579061_AmLEPqf4hFkMwQFt7UHfehelBw5YdZUI.jpg"
    },
    {
      "name": "Frappe",
      "image": "https://t4.ftcdn.net/jpg/02/96/03/41/240_F_296034153_k1R4cnG7DDuioTbJDrCOA8KF0X1yOEpy.jpg"
    },
    {
      "name": "Cheesecake",
      "image": "https://t3.ftcdn.net/jpg/03/91/03/02/240_F_391030291_AgLpMcp3CPkbsinsCakMknQcHAbraNIb.jpg"
    }
  ];

  postres: Array<{ "productname": string, "price": number, "photoUrl": string, "stock": string }> = []

  constructor(private alertController: AlertController, private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.buscarPorMenu(5).subscribe({
      complete: () => { },
      next: (value: any) => {
        console.log(value);
        this.postres = value.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  async presentAlert(taco: { productname: string; price: number; photoUrl: string, stock: string }) {
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
          max: taco.productname
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
