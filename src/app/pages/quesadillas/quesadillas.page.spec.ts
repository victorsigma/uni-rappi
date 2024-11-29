import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuesadillasPage } from './quesadillas.page';

describe('QuesadillasPage', () => {
  let component: QuesadillasPage;
  let fixture: ComponentFixture<QuesadillasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesadillasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
