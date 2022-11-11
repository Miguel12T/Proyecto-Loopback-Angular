import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloDirectivo } from '../modelos/directivo.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class DirectivoService {

  url = 'http://localhost:3000';
  token: string = '';
  
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.obtenerToken();
   }

  obtenerRegistros():Observable<ModeloDirectivo[]>{
    return this.http.get<ModeloDirectivo[]>(`${this.url}/directivos`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  obtenerRegistroPorId(id:string):Observable<ModeloDirectivo>{
    return this.http.get<ModeloDirectivo>(`${this.url}/directivos/${id}`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  crearDirectivo(directivo: ModeloDirectivo): Observable<ModeloDirectivo>{
    return this.http.post<ModeloDirectivo>(`${this.url}/directivos`,directivo, {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  
  actualizarDirectivo(directivo: ModeloDirectivo): Observable<ModeloDirectivo>{
    return this.http.put<ModeloDirectivo>(`${this.url}/directivos/${directivo.id}`,directivo, {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  eliminarDirectivo(id: string): Observable<any>{
    return this.http.delete(`${this.url}/directivos/${id}`,{
      headers: new HttpHeaders({
        
      })
    })
  }
}
