import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'nuevaContraseña123',
    description: 'Nueva contraseña del usuario (mínimo 6 caracteres)'
  })
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({
    example: '123456',
    description: 'Código de recuperación enviado al correo electrónico'
  })
  @IsString()
  recoveryCode: string;
} 