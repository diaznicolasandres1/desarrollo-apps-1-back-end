import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos del usuario inválidos' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
  findAll() {
    return this.userService.findAll();
  }

  @Get("email/:email")
  @ApiOperation({ summary: 'Obtener usuario por email' })
  @ApiParam({ name: 'email', description: 'Email del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Get("username/:username")
  @ApiOperation({ summary: 'Obtener usuario por nombre de usuario' })
  @ApiParam({ name: 'username', description: 'Nombre de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findByUsername(@Param("username") username: string) {
    return this.userService.findByUsername(username);
  }

  @Post("auth")
  @ApiOperation({ summary: 'Autenticar usuario' })
  @ApiResponse({ status: 201, description: 'Usuario autenticado exitosamente' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async auth(@Body() authUserDto: AuthUserDto) {
    const user = await this.userService.authUser(authUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Usuario autenticado exitosamente",
      data: user
    };
  }

  @Put("recovery-code")
  @ApiOperation({ summary: 'Solicitar código de recuperación' })
  @ApiResponse({ status: 200, description: 'Código de recuperación enviado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateRecoveryCode(@Body('email') email: string) {
    return this.userService.updateRecoveryCode(email);
  }

  @Put("change-password")
  @ApiOperation({ summary: 'Cambiar contraseña con código de recuperación' })
  @ApiResponse({ status: 200, description: 'Contraseña cambiada exitosamente' })
  @ApiResponse({ status: 400, description: 'Código de recuperación inválido' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(changePasswordDto);
  }

  @Get(":id")
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
} 