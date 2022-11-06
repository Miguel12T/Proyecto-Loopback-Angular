import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDirectivoComponent } from './buscar-directivo.component';

describe('BuscarDirectivoComponent', () => {
  let component: BuscarDirectivoComponent;
  let fixture: ComponentFixture<BuscarDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarDirectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
