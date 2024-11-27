import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstScreenPage } from './first-screen.page';

describe('FirstScreenPage', () => {
  let component: FirstScreenPage;
  let fixture: ComponentFixture<FirstScreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
