import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloTiposervicio } from '../modelos/tiposervicio.modelo';

@Injectable({
  providedIn: 'root'
})
export class TiposervicioService {

  url='http://localhost:3000';
  constructor(private http: HttpClient) { }

  ObtenerTiposervicio(): Observable<ModeloTiposervicio[]>{
    return this.http.get<ModeloTiposervicio[]>(`${this.url}/tipo-servicios`)
  }

  ObtenerTiposervicioPorId(id: string): Observable<ModeloTiposervicio>{
    return this.http.get<ModeloTiposervicio>(`${this.url}/tipo-servicios/${id}`)
  }

  CrearTiposervicio(tiposervicio:ModeloTiposervicio):Observable<ModeloTiposervicio>{
    return this.http.post<ModeloTiposervicio>(`${this.url}/tipo-servicios`,tiposervicio)
  }

  ActualizarTiposervicio(tiposervicio:ModeloTiposervicio):Observable<ModeloTiposervicio>{
    return this.http.put<ModeloTiposervicio>(`${this.url}/tipo-servicios/${tiposervicio.id}`,tiposervicio)
  }

  EliminarTiposervicio(id: string):Observable<any>{
    return this.http.delete(`${this.url}/tipo-servicios/${id}`)
  }

}
