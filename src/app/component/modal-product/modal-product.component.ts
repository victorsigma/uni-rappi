import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent  implements OnInit {
  @Input() pizza: any;

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
