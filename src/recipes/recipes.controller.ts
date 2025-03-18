import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { RecipesService } from "./recipes.service";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAll(
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("sort") sort: string = "desc",
  ) {
    return this.recipesService.getAll(limit, sort);
  }

  @Get("filter")
  async getFilteredByIngredients(
    @Query("include") include: string,
    @Query("exclude") exclude: string,
  ) {
    const includeArray = include ? include.split(",") : [];
    const excludeArray = exclude ? exclude.split(",") : [];

    return this.recipesService.getFilteredByIngredients(
      includeArray,
      excludeArray,
    );
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.recipesService.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateRecipeDto) {
    return this.recipesService.create(dto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateRecipeDto) {
    return this.recipesService.update(id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.recipesService.delete(id);
  }

  @Put(":id/approve")
  async approveRecipe(@Param("id") id: string) {
    return this.recipesService.approveRecipe(id);
  }
}
