import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'juanperez',
    description: 'Nombre de usuario único'
  })
  username: string;

  @ApiProperty({
    example: 'contraseña123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)'
  })
  password: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario'
  })
  email: string;

  @ApiProperty({
    example: 'active',
    description: 'Estado del usuario',
    required: false,
    default: 'active'
  })
  status?: string;

  @ApiProperty({
    example: 'user',
    description: 'Rol del usuario',
    required: false,
    default: 'user'
  })
  rol?: string;
}
