import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloEmpresaCliente } from '../modelos/empresacliente.modelo';

@Injectable({
  providedIn: 'root'
})
export class EmpresaclienteService {

  url = 'http://localhost:3000';
  token: string = '';

  constructor(private http: HttpClient) { }


  CrearEmpresacliente(empresacliente:ModeloEmpresaCliente):Observable<ModeloEmpresaCliente>{
    return this.http.post<ModeloEmpresaCliente>(`${this.url}/empresa-clientes`,empresacliente)
  }

  ActualizarEmpresacliente(empresacliente:ModeloEmpresaCliente):Observable<ModeloEmpresaCliente>{
    return this.http.put<ModeloEmpresaCliente>(`${this.url}/empresa-clientes/${empresacliente.id}`,empresacliente)
  }

  ObtenerEmpresacliente(): Observable<ModeloEmpresaCliente[]>{
    return this.http.get<ModeloEmpresaCliente[]>(`${this.url}/empresa-clientes`)
  }

  ObtenerEmpresaclientePorId(id: string): Observable<ModeloEmpresaCliente>{
    return this.http.get<ModeloEmpresaCliente>(`${this.url}/empresa-clientes/${id}`)
  }
}
