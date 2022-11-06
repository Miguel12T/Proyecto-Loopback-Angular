import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Cliente, Persona } from '../models';
import { ClienteRepository, PersonaRepository } from '../repositories';
import { Llaves } from '../config/llaves';
const generatePassword = require('password-generator');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository:ClienteRepository,
    @repository(PersonaRepository)
    public personaRepository:PersonaRepository
  ) {}

  generarClave():string{
    const clave = generatePassword(12, false);
    return clave;
  }

  cifrarClave(clave:string){
    let claveCifrada = CryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  async identificarPersona(clave:string, usuario:string){
    try {
      const p = await this.clienteRepository.findOne({where:{clave: clave}});

      const persona = this.personaRepository.findById(p?.personaId);
      
      if (persona) {
        if ((await persona).identificacion == usuario) {
            return persona;
        }
        return false;
      }
      return false;
    } catch {
      return false;
    }
  }

  generarTokenJWT(persona:Persona){
    let token = jwt.sign({
      data:{
        id:persona.id,
        nombre:persona.nombre,
        email:persona.email,
        identificacion:persona.identificacion
      }
    },
     Llaves.claveJWT);
     return token;
  }

  validarTokenJWT(token:string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos
    } catch {
      return false
    }
  }
}
