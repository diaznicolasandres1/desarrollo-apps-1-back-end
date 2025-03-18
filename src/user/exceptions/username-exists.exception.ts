import { ConflictException } from '@nestjs/common';

export class UsernameExistsException extends ConflictException {
  constructor(username: string) {
    super(`El username ${username} ya está registrado`);
  }
} 