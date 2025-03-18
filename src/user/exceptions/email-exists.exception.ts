import { ConflictException } from '@nestjs/common';

export class EmailExistsException extends ConflictException {
  constructor(email: string) {
    super(`El email ${email} ya está registrado`);
  }
} 