import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpresaclienteComponent } from './editar-empresacliente.component';

describe('EditarEmpresaclienteComponent', () => {
  let component: EditarEmpresaclienteComponent;
  let fixture: ComponentFixture<EditarEmpresaclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEmpresaclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpresaclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
