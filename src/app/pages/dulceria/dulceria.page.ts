import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';

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

  dulces: Array<{ "productname": string, "price": number, "photoUrl": string, "stock": string }> = []


  constructor(private alertController: AlertController, private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.buscarPorMenu(8).subscribe({
      complete: () => { },
      next: (value: any) => {
        console.log(value);
        this.dulces = value.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  async presentAlert(dulceria: { productname: string; price: number; photoUrl: string, stock: string }) {
    const alert = await this.alertController.create({
      header: `${dulceria.productname}`,
      subHeader: `Precio: $${dulceria.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1 para que no sea negativo
          value: 1, // Valor por defecto
          max: dulceria.stock
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
              console.log(`Se agregaron ${quantity} unidades de la quesadilla ${dulceria.productname}`);
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
