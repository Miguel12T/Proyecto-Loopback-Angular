import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloGerente } from '../modelos/gerente.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  url = 'http://localhost:3000';
  token: string = '';
  
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.obtenerToken();
   }

  obtenerRegistros():Observable<ModeloGerente[]>{
    return this.http.get<ModeloGerente[]>(`${this.url}/gerentes`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  obtenerRegistroPorId(id:string):Observable<ModeloGerente>{
    return this.http.get<ModeloGerente>(`${this.url}/gerentes/${id}`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  crearGerente(gerente: ModeloGerente): Observable<ModeloGerente>{
    return this.http.post<ModeloGerente>(`${this.url}/gerentes`,gerente, {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  
  actualizarGerente(gerente: ModeloGerente): Observable<ModeloGerente>{
    return this.http.put<ModeloGerente>(`${this.url}/gerentes/${gerente.id}`,gerente, {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  eliminarGerente(id: string): Observable<any>{
    return this.http.delete(`${this.url}/gerentes/${id}`,{
      headers: new HttpHeaders({
        
      })
    })
  }
}
