import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloEmpleado } from '../modelos/empleado.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  url = 'http://localhost:3000';
  token: string = '';
  
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.obtenerToken();
   }

  obtenerRegistros():Observable<ModeloEmpleado[]>{
    return this.http.get<ModeloEmpleado[]>(`${this.url}/empleados`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  obtenerRegistroPorId(id:string):Observable<ModeloEmpleado>{
    return this.http.get<ModeloEmpleado>(`${this.url}/empleados/${id}`,{
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  crearEmpleado(empleado: ModeloEmpleado): Observable<ModeloEmpleado>{
    return this.http.post<ModeloEmpleado>(`${this.url}/empleados`,empleado, {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }
  
  actualizarEmpleado(empleado: ModeloEmpleado): Observable<ModeloEmpleado>{
    return this.http.put<ModeloEmpleado>(`${this.url}/empleados/${empleado.id}`,empleado, {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.token}`
      })
    })
  }

  eliminarEmpleado(id: string): Observable<any>{
    return this.http.delete(`${this.url}/empleados/${id}`,{
      headers: new HttpHeaders({
        
      })
    })
  }
}
