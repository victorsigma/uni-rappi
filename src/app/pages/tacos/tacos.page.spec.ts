import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TacosPage } from './tacos.page';

describe('TacosPage', () => {
  let component: TacosPage;
  let fixture: ComponentFixture<TacosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TacosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
