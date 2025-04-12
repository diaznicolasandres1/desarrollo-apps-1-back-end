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
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Recetas')
@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las recetas' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Límite de recetas a obtener' })
  @ApiQuery({ name: 'sort', required: false, enum: ['asc', 'desc'], description: 'Orden de las recetas' })
  @ApiResponse({ status: 200, description: 'Lista de recetas obtenida exitosamente' })
  async getAll(
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("sort") sort: string = "desc",
  ) {
    return this.recipesService.getAll(limit, sort);
  }

  @Get("filter")
  @ApiOperation({ summary: 'Filtrar recetas por ingredientes' })
  @ApiQuery({ name: 'include', required: false, description: 'Ingredientes que deben incluir (separados por comas)' })
  @ApiQuery({ name: 'exclude', required: false, description: 'Ingredientes que deben excluir (separados por comas)' })
  @ApiResponse({ status: 200, description: 'Lista de recetas filtradas obtenida exitosamente' })
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
  @ApiOperation({ summary: 'Obtener una receta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la receta' })
  @ApiResponse({ status: 200, description: 'Receta obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'Receta no encontrada' })
  async getById(@Param("id") id: string) {
    return this.recipesService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva receta' })
  @ApiResponse({ status: 201, description: 'Receta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de la receta inválidos' })
  async create(@Body() dto: CreateRecipeDto) {
    return this.recipesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Actualizar una receta existente' })
  @ApiParam({ name: 'id', description: 'ID de la receta a actualizar' })
  @ApiResponse({ status: 200, description: 'Receta actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Receta no encontrada' })
  async update(@Param("id") id: string, @Body() dto: UpdateRecipeDto) {
    return this.recipesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Eliminar una receta' })
  @ApiParam({ name: 'id', description: 'ID de la receta a eliminar' })
  @ApiResponse({ status: 200, description: 'Receta eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Receta no encontrada' })
  async delete(@Param("id") id: string) {
    return this.recipesService.delete(id);
  }

  @Put(":id/approve")
  @ApiOperation({ summary: 'Aprobar una receta' })
  @ApiParam({ name: 'id', description: 'ID de la receta a aprobar' })
  @ApiResponse({ status: 200, description: 'Receta aprobada exitosamente' })
  @ApiResponse({ status: 404, description: 'Receta no encontrada' })
  async approveRecipe(@Param("id") id: string) {
    return this.recipesService.approveRecipe(id);
  }
}
