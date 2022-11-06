import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarGerenteComponent } from './buscar-gerente.component';

describe('BuscarGerenteComponent', () => {
  let component: BuscarGerenteComponent;
  let fixture: ComponentFixture<BuscarGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
