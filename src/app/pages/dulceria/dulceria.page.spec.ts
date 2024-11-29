import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DulceriaPage } from './dulceria.page';

describe('DulceriaPage', () => {
  let component: DulceriaPage;
  let fixture: ComponentFixture<DulceriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DulceriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
