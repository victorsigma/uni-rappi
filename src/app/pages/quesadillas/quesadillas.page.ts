import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CarritoComponent } from 'src/app/component/carrito/carrito.component';
import { CarService } from 'src/app/services/car/car.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-quesadillas',
  templateUrl: './quesadillas.page.html',
  styleUrls: ['./quesadillas.page.scss'],
})
export class QuesadillasPage implements OnInit {
  menu = [
    {
      "name": "Quesadillas",
      "image": "https://t3.ftcdn.net/jpg/05/97/08/60/240_F_597086001_dSkCB93ZHgVZV5RrITJjswqmmxcwwG4G.jpg"
    },
    {
      "name": "Gorditas",
      "image": "https://t3.ftcdn.net/jpg/06/25/55/90/240_F_625559005_SyzdJKtwIVAWhiYd3l2FqZpUYLuY48MI.jpg"
    },
    {
      "name": "Sopes",
      "image": "https://t3.ftcdn.net/jpg/08/34/78/40/240_F_834784019_X2d5lc9d6p7FWM2U0cqcRQEbr7D85tce.jpg"
    },
    {
      "name": "Platillos",
      "image": "https://t3.ftcdn.net/jpg/05/04/64/66/240_F_504646697_aXCSBa1SvdmU93jGI66OHVzoEMLOK9yI.jpg"
    },
    {
      "name": "Tacos",
      "image": "https://t4.ftcdn.net/jpg/09/55/51/59/240_F_955515960_bq0s8lqUxohQ8D6UYRmoLHO7vICafzyT.jpg"
    },
    {
      "name": "Tacos dorados",
      "image": "https://t3.ftcdn.net/jpg/07/32/29/22/240_F_732292254_yh4vupuAYA5FuxFs3tDAEvrYmyN0XYtd.jpg"
    }
  ];

  quesadillas: Array<{ "id": number, "productname": string, "price": number, "photoUrl": string, "stock": string }> = [
    // { "name": "Quesadilla de Chicharrón", "price": 25 },
    // { "name": "Quesadilla de Pollo", "price": 25 },
    // { "name": "Quesadilla Rajas con Queso", "price": 25 },
    // { "name": "Quesadilla de Tinga", "price": 25 },
    // { "name": "Quesadilla de Chorizo", "price": 25 },
    // /**gorditas */
    // { "name": "Gordita de Chicharrón", "price": 20 },
    // { "name": "Gordita de Frijoles", "price": 20 },
    // { "name": "Gordita de deshebrada", "price": 20 },
    // { "name": "Gordita de Nopalitos", "price": 20 },
    // { "name": "Gordita de Chorizo con Papa", "price": 20 },
    // /**tacos */
    // { "name": "Taco de Asada", "price": 18 },
    // { "name": "Taco al Pastor", "price": 18 },
    // { "name": "Taco de Carnitas", "price": 18 },
    // { "name": "Taco de Barbacoa", "price": 18 },
    // { "name": "Taco de Pollo", "price": 18 },
    // /**Tacos Dorados  */
    // { "name": "Taco Dorado de Pollo", "price": 22 },
    // { "name": "Taco Dorado de Papa", "price": 22 },
    // { "name": "Taco Dorado de Frijoles", "price": 22 },
    // { "name": "Taco Dorado de Carne Molida", "price": 22 },
    // /**sopes  */
    // { "name": "Sope de Chorizo", "price": 25 },
    // { "name": "Sope de Pollo", "price": 25 },
    // { "name": "Sope de Carnitas", "price": 25 },
    // { "name": "Sope de Asada", "price": 25 },
    // /**Platillo */
    // { "name": "Platillo de Enchiladas", "price": 70 },
    // { "name": "Platillo de Mole", "price": 80 },
    // { "name": "Platillo de Pozole", "price": 65 },
    // { "name": "Platillo de Barbacoa", "price": 85 }

  ];

  constructor(private alertController: AlertController, private productosService: ProductosService, private modalController: ModalController,
    private carService: CarService) { }

  ngOnInit() {
    this.productosService.buscarPorMenu(3).subscribe({
      complete: () => { },
      next: (value: any) => {
        console.log(value);
        this.quesadillas = value.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  async presentAlert(quesadilla: { id: number, productname: string; price: number; photoUrl: string, stock: string }) {
    const alert = await this.alertController.create({
      header: `${quesadilla.productname}`,
      subHeader: `Precio: $${quesadilla.price}`,
      message: '¿Cuántas unidades deseas agregar?',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1, // Mínimo 1 para que no sea negativo
          value: 1, // Valor por defecto,
          max: quesadilla.stock
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
              console.log(`Se agregaron ${quantity} unidades de la quesadilla ${quesadilla.productname}`);
              (await this.carService.addToCar({ id: quesadilla.id, quantity }));
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
