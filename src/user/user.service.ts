import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddFavoriteRecipeDto } from "./dto/add-favorite-recipe.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { EmailExistsException } from "./exceptions/email-exists.exception";
import { UsernameExistsException } from "./exceptions/username-exists.exception";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingUsername = await this.userModel
      .findOne({ username: dto.username })
      .exec();
    if (existingUsername) {
      throw new UsernameExistsException(dto.username);
    }
    const existingEmail = await this.userModel
      .findOne({ email: dto.email })
      .exec();
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
      throw new NotFoundException(
        `Usuario con username ${username} no encontrado`
      );
    }
    return user;
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
      throw new NotFoundException("Usuario no encontrado");
    }

    if (user.status !== "full_registered") {
      throw new BadRequestException(
        "El usuario no está completamente registrado"
      );
    }

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.lastRecoveryCode = recoveryCode;
    await user.save();

    return {
      message: "Código de recuperación generado exitosamente",
      recoveryCode,
    };
  }

  async authUser(authUserDto: AuthUserDto) {
    const user = await this.userModel.findOne({
      email: authUserDto.email,
      password: authUserDto.password,
    });

    if (!user) {
      throw new NotFoundException("Usuario o contraseña incorrectos");
    }

    if (user.status === "register_not_finished") {
      throw new BadRequestException("El registro del usuario no está completo");
    }

    return user;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findOne({
      email: changePasswordDto.email,
      lastRecoveryCode: changePasswordDto.recoveryCode,
    });

    if (!user) {
      throw new NotFoundException(
        "Usuario no encontrado o código de recuperación inválido"
      );
    }

    if (user.status !== "full_registered") {
      throw new BadRequestException(
        "El usuario no está completamente registrado"
      );
    }

    user.password = changePasswordDto.newPassword;
    user.lastRecoveryCode = "";
    await user.save();

    return {
      message: "Contraseña actualizada exitosamente",
    };
  }

  async addFavoriteRecipe(
    userId: string,
    dto: AddFavoriteRecipeDto
  ): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    if (user.favedRecipesIds?.includes(dto.recipeId)) {
      throw new BadRequestException("La receta ya está en favoritos");
    }

    if (!user.favedRecipesIds) {
      user.favedRecipesIds = [];
    }

    user.favedRecipesIds.push(dto.recipeId);
    await user.save();

    return user;
  }

  async removeFavoriteRecipe(userId: string, recipeId: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    if (!user.favedRecipesIds || !user.favedRecipesIds.includes(recipeId)) {
      throw new NotFoundException("Usuario o receta no encontrados");
    }

    user.favedRecipesIds = user.favedRecipesIds.filter((id) => id !== recipeId);
    await user.save();

    return user;
  }
}
