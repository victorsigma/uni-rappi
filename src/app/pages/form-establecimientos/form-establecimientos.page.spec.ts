import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormEstablecimientosPage } from './form-establecimientos.page';

describe('FormEstablecimientosPage', () => {
  let component: FormEstablecimientosPage;
  let fixture: ComponentFixture<FormEstablecimientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstablecimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
