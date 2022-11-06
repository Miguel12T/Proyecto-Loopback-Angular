import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDirectivoComponent } from './editar-directivo.component';

describe('EditarDirectivoComponent', () => {
  let component: EditarDirectivoComponent;
  let fixture: ComponentFixture<EditarDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDirectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
