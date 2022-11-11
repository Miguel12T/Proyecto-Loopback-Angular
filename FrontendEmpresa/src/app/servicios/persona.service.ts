import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerRegistros():Observable<ModeloPersona[]>{
    return this.http.get<ModeloPersona[]>(`${this.url}/personas`)
  }

  obtenerRegistroPorId(id:string):Observable<ModeloPersona>{
    return this.http.get<ModeloPersona>(`${this.url}/personas/${id}`)
  }

  crearPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.post<ModeloPersona>(`${this.url}/personas`,persona, {
      headers: new HttpHeaders({

      })
    })
  }

  actualizarPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.put<ModeloPersona>(`${this.url}/personas/${persona.id}`,persona, {
      headers: new HttpHeaders({
        
      })
    })
  }

  eliminarPersona(id: string): Observable<any>{
    return this.http.delete(`${this.url}/personas/${id}`,{
      headers: new HttpHeaders({
        
      })
    })
  }
}
