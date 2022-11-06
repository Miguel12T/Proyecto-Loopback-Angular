import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarGerenteComponent } from './eliminar-gerente.component';

describe('EliminarGerenteComponent', () => {
  let component: EliminarGerenteComponent;
  let fixture: ComponentFixture<EliminarGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
