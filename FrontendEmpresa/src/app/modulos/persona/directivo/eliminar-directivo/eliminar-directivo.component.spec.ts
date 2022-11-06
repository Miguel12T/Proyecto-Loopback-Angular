import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarDirectivoComponent } from './eliminar-directivo.component';

describe('EliminarDirectivoComponent', () => {
  let component: EliminarDirectivoComponent;
  let fixture: ComponentFixture<EliminarDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarDirectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
