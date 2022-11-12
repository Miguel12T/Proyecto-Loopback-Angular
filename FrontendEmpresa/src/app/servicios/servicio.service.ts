import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloServicio } from '../modelos/servicio.modelo';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url='http://localhost:3000';
  constructor(private http: HttpClient) { }

  ObtenerServicio(): Observable<ModeloServicio[]>{
    return this.http.get<ModeloServicio[]>(`${this.url}/servicios`)
  }

  ObtenerServicioPorId(id: string): Observable<ModeloServicio>{
    return this.http.get<ModeloServicio>(`${this.url}/servicios/${id}`)
  }

  EliminarServicio(id: string):Observable<any>{
    return this.http.delete(`${this.url}/servicios/${id}`)
  }
}
