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

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get("email/:email")
  findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Get("username/:username")
  findByUsername(@Param("username") username: string) {
    return this.userService.findByUsername(username);
  }

  @Post("auth")
  async auth(@Body() authUserDto: AuthUserDto) {
    const user = await this.userService.authUser(authUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Usuario autenticado exitosamente",
      data: user
    };
  }

  @Put("recovery-code")
  async updateRecoveryCode(@Body('email') email: string) {
    return this.userService.updateRecoveryCode(email);
  }

  @Put("change-password")
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(changePasswordDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
} 