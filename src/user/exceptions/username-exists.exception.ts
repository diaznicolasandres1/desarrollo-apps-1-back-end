import { ConflictException } from '@nestjs/common';

export class UsernameExistsException extends ConflictException {
  constructor(username: string) {
    super(`El nombre de usuario ${username} ya está en uso`);
  }
} 