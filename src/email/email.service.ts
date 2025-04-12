import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'diaznicolasandres1@gmail.com',
        pass: 'tu-contraseña-de-aplicacion'
      },
    });
  }

  async sendEmail({ to, subject, text, html }) {
    await this.transporter.sendMail({
      from: 'diaznicolasandres1@gmail.com',
      to,
      subject,
      text,
      html,
    });
  }
} 