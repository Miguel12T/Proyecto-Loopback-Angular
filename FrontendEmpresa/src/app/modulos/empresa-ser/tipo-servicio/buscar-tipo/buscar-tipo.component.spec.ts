import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTipoComponent } from './buscar-tipo.component';

describe('BuscarTipoComponent', () => {
  let component: BuscarTipoComponent;
  let fixture: ComponentFixture<BuscarTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
