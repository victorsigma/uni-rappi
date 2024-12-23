import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
})
export class PhotoModalComponent {
  @Input() userId!: number;
  @Input() photoUrl!: string;

  selectedFile: File | null = null;
  isLoading: boolean = false; // Estado de carga
  
  label: string = 'Seleccionar Fotografía'; // Texto inicial del label

  constructor(
    private modalController: ModalController,
    private usersService: UsersService
  ) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];

    const input = event.target as HTMLInputElement;

    if (input?.files && input.files.length > 0) {
      // Actualiza el texto del label con el nombre del archivo
      this.label = input.files[0].name;
    } else {
      // Si no hay archivo seleccionado, muestra el texto predeterminado
      this.label = 'Seleccionar Fotografía';
    }
  }

  async uploadPhoto() {
    if (!this.selectedFile) return;

    this.isLoading = true;

    const formData = new FormData();
    formData.append('photo', this.selectedFile);

    try {
      const response: any = await firstValueFrom(
        this.usersService.uploadPhoto(this.userId, formData)
      );
      this.photoUrl = response.data.photoUrl; // Actualiza la foto en el modal
    } catch (error) {
      console.error('Error al subir la foto:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async removePhoto() {
    this.isLoading = true;

    try {
      await firstValueFrom(this.usersService.removePhoto(this.userId));
      this.photoUrl = '';
    } catch (error) {
      console.error('Error al eliminar la foto:', error);
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.modalController.dismiss({ photoUrl: this.photoUrl || null });
  }

}
