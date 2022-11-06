import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDirectivoComponent } from './crear-directivo.component';

describe('CrearDirectivoComponent', () => {
  let component: CrearDirectivoComponent;
  let fixture: ComponentFixture<CrearDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDirectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
