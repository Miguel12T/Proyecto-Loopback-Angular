import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = 'http://localhost:3000';
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) { 
    this.verificarSesionActual();
  }

  verificarSesionActual(){
    let datos = this.obternerInfoSesion();
    if (datos) {
      this.refrescarDatosSesion(datos)
    }
  }

  refrescarDatosSesion(datos: ModeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  obtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }

  Identificar(usuario:string, clave:string):Observable<ModeloIdentificar>{
    return this.http.post<ModeloIdentificar>(`${this.url}/identificarPersona`,{
      usuario: usuario,
      clave: clave
    },{
      headers: new HttpHeaders({

      })
    })
  }

  almacenarSesion(datos:ModeloIdentificar){
    datos.estadoIdentificado = true;
    let stringDatos = JSON.stringify(datos)
    localStorage.setItem("datosSesion", stringDatos);
    this.refrescarDatosSesion(datos);
  }

  obternerInfoSesion(){
    let datosString = localStorage.getItem("datosSesion")
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos
    } else {
      return null;
    }
  }

  eliminarInfoSesion(){
    localStorage.removeItem("datosSesion");
    this.refrescarDatosSesion(new ModeloIdentificar());
  }

  sesionIniciada(){
    let datosString = localStorage.getItem("datosSesion")
    return datosString;
  }

  obtenerToken(){
    let datosString = localStorage.getItem("datosSesion");
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos.tk;
    }else{
      return '';
    }
  }
}
