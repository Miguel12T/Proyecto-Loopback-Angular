import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { PersonaRepository } from '../repositories';
const sgMail = require('@sendgrid/mail')

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository:PersonaRepository,
  ) {}

enviarEmail(to:string, html:string){
    sgMail.setApiKey('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');
    const msg = {
      to: to, // Change to your recipient
      from: 'empresatic09@gmail.com', // Change to your verified sender
      subject: 'Contraseña de ingreso',
      html: html,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error:any) => {
        console.error(error)
      })
  }
}
