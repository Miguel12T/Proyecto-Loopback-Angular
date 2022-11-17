import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpresaclienteComponent } from './crear-empresacliente.component';

describe('CrearEmpresaclienteComponent', () => {
  let component: CrearEmpresaclienteComponent;
  let fixture: ComponentFixture<CrearEmpresaclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEmpresaclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEmpresaclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
