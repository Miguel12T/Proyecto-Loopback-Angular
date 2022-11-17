import { TestBed } from '@angular/core/testing';

import { EmpresaclienteService } from './empresacliente.service';

describe('EmpresaclienteService', () => {
  let service: EmpresaclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaclienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
