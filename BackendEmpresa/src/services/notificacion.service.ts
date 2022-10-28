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

  enviarEmail(to:string){
      sgMail.setApiKey('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');
      const msg = {
        to: to, // Change to your recipient
        from: 'empresatic09@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
