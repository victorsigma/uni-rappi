import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantillaTiendaPage } from './plantilla-tienda.page';

describe('PlantillaTiendaPage', () => {
  let component: PlantillaTiendaPage;
  let fixture: ComponentFixture<PlantillaTiendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
