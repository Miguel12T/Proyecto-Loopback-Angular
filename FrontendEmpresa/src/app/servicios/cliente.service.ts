import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloCliente } from '../modelos/cliente.modelo';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  obtenerRegistros():Observable<ModeloCliente[]>{
    return this.http.get<ModeloCliente[]>(`${this.url}/clientes`)
  }

  obtenerRegistroPorId(id:string):Observable<ModeloCliente>{
    return this.http.get<ModeloCliente>(`${this.url}/clientes/${id}`)
  }

  crearCliente(cliente: ModeloCliente): Observable<ModeloCliente>{
    return this.http.post<ModeloCliente>(`${this.url}/clientes`,cliente, {
      headers: new HttpHeaders({

      })
    })
  }
  
  actualizarCliente(cliente: ModeloCliente): Observable<ModeloCliente>{
    return this.http.put<ModeloCliente>(`${this.url}/clientes/${cliente.id}`,cliente, {
      headers: new HttpHeaders({
        
      })
    })
  }

  eliminarCliente(id: string): Observable<any>{
    return this.http.delete(`${this.url}/clientes/${id}`,{
      headers: new HttpHeaders({
        
      })
    })
  }

}
