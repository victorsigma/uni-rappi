import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HamburguesasPage } from './hamburguesas.page';

describe('HamburguesasPage', () => {
  let component: HamburguesasPage;
  let fixture: ComponentFixture<HamburguesasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburguesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
