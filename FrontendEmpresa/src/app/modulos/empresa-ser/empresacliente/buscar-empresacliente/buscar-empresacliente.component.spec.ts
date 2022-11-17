import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEmpresaclienteComponent } from './buscar-empresacliente.component';

describe('BuscarEmpresaclienteComponent', () => {
  let component: BuscarEmpresaclienteComponent;
  let fixture: ComponentFixture<BuscarEmpresaclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEmpresaclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEmpresaclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
