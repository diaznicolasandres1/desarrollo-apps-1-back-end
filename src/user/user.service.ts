import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsernameExistsException } from "./exceptions/username-exists.exception";
import { EmailExistsException } from "./exceptions/email-exists.exception";
import { AuthUserDto } from "./dto/auth-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingUsername = await this.userModel.findOne({ username: dto.username }).exec();
    if (existingUsername) {
      throw new UsernameExistsException(dto.username);
    }
    const existingEmail = await this.userModel.findOne({ email: dto.email }).exec();
    if (existingEmail) {
      throw new EmailExistsException(dto.email);
    }

    const newUser = new this.userModel({
      ...dto,
      rol: dto.rol || "user",
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con username ${username} no encontrado`);
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return deletedUser;
  }

  async updateRecoveryCode(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.status !== 'full_registered') {
      throw new BadRequestException('El usuario no está completamente registrado');
    }

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.lastRecoveryCode = recoveryCode;
    await user.save();

    return {
      message: 'Código de recuperación generado exitosamente',
      recoveryCode
    };
  }

  async authUser(authUserDto: AuthUserDto) {
    const user = await this.userModel.findOne({ 
      email: authUserDto.email,
      password: authUserDto.password
    });

    if (!user) {
      throw new NotFoundException('Usuario o contraseña incorrectos');
    }

    if (user.status === 'register_not_finished') {
      throw new BadRequestException('El registro del usuario no está completo');
    }

    return user;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findOne({ 
      email: changePasswordDto.email,
      lastRecoveryCode: changePasswordDto.recoveryCode
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado o código de recuperación inválido');
    }

    if (user.status !== 'full_registered') {
      throw new BadRequestException('El usuario no está completamente registrado');
    }

    user.password = changePasswordDto.newPassword;
    user.lastRecoveryCode = ''; 
    await user.save();

    return {
      message: 'Contraseña actualizada exitosamente'
    };
  }
} 