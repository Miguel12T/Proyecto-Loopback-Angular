import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaclienteComponent } from './empresacliente.component';

describe('EmpresaclienteComponent', () => {
  let component: EmpresaclienteComponent;
  let fixture: ComponentFixture<EmpresaclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
