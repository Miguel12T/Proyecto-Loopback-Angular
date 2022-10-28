import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { ClienteRepository } from '../repositories';
const generatePassword = require('password-generator');
const CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository:ClienteRepository,
  ) {}

  generarClave():string{
    const clave = generatePassword(12, false);
    return clave;
  }

  cifrarClave(clave:string){
    let claveCifrada = CryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
}
