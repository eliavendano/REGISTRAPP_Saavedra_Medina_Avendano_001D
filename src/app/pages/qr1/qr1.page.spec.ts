import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Qr1Page } from './qr1.page';

describe('Qr1Page', () => {
  let component: Qr1Page;
  let fixture: ComponentFixture<Qr1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Qr1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
