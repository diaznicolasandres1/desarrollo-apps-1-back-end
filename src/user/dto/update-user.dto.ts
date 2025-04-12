import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'juanperez',
    description: 'Nombre de usuario único',
    required: false
  })
  username?: string;

  @ApiProperty({
    example: 'nuevaContraseña123',
    description: 'Nueva contraseña del usuario (mínimo 6 caracteres)',
    required: false
  })
  password?: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
    required: false
  })
  email?: string;

  @ApiProperty({
    example: 'active',
    description: 'Estado del usuario',
    required: false
  })
  status?: string;

  @ApiProperty({
    example: 'user',
    description: 'Rol del usuario',
    required: false
  })
  rol?: string;
} 