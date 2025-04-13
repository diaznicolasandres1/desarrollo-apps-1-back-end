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
import {  } from '@nestjs/swagger';
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { AddFavoriteRecipeDto } from "./dto/add-favorite-recipe.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiExcludeEndpoint, ApiBody } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiExcludeEndpoint()
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
  @ApiBody({ type: AuthUserDto })
  @ApiResponse({ status: 200, description: 'Usuario autenticado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario o contraseña incorrectos' })
  @ApiResponse({ status: 400, description: 'El registro del usuario no está completo' })
  async auth(@Body() authUserDto: AuthUserDto) {
    const user = await this.userService.authUser(authUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: "Usuario autenticado exitosamente",
      data: user
    };
  }

  @Put("recovery-code")
  @ApiOperation({ summary: 'Solicitar código de recuperación' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'juan.perez@example.com'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Código de recuperación enviado exitosamente' })
  @ApiResponse({ status: 400, description: 'El usuario no está completamente registrado' })
  async updateRecoveryCode(@Body('email') email: string) {
    return this.userService.updateRecoveryCode(email);
  }

  @Put("change-password")
  @ApiOperation({ summary: 'Cambiar contraseña con código de recuperación' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña cambiada exitosamente' })
  @ApiResponse({ status: 400, description: 'El usuario no está completamente registrado' })
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

  @ApiExcludeEndpoint()
  @Delete(":id")
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }

  @Post(":id/favorite-recipe")
  @ApiOperation({ 
    summary: 'Agregar receta a favoritos',
    description: 'Agrega una receta a la lista de favoritos del usuario. La receta no debe estar ya en la lista de favoritos.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID del usuario al que se le agregará la receta a favoritos',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiBody({ 
    type: AddFavoriteRecipeDto,
    description: 'Datos de la receta a agregar a favoritos'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Receta agregada a favoritos exitosamente',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Receta agregada a favoritos exitosamente' },
        data: { type: 'object', description: 'Usuario actualizado con la nueva receta en favoritos' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuario no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Usuario con ID 507f1f77bcf86cd799439011 no encontrado' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'La receta ya está en favoritos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'La receta ya está en favoritos' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  async addFavoriteRecipe(
    @Param('id') id: string,
    @Body() dto: AddFavoriteRecipeDto
  ) {
    const user = await this.userService.addFavoriteRecipe(id, dto);
    return {
      statusCode: HttpStatus.OK,
      message: "Receta agregada a favoritos exitosamente",
      data: user
    };
  }
} 