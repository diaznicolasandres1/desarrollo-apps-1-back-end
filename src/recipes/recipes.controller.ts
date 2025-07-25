import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { RatingDto, UpdateRatingDto } from "./dto/nested/recipe-nested.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./schemas/recipe.schema";

@ApiTags("Recetas")
@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: "Obtener todas las recetas" })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Límite de recetas a obtener",
  })
  @ApiQuery({
    name: "sort",
    required: false,
    enum: ["asc", "desc"],
    description: "Orden de las recetas",
  })
  @ApiQuery({
    name: "onlyApproved",
    required: false,
    type: Boolean,
    description: "Solo recetas aprobadas (por defecto: true)",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de recetas obtenida exitosamente",
  })
  async getAll(
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("sort") sort: string = "desc",
    @Query("onlyApproved") onlyApproved: string = "false"
  ) {
    const onlyApprovedBool = onlyApproved.toLowerCase() === "true";
    return this.recipesService.getAll(limit, sort, onlyApprovedBool);
  }

  @Get("filter")
  @ApiOperation({
    summary: "Filtrar recetas por ingredientes, nombres, usuarios y categorías",
  })
  @ApiQuery({
    name: "include",
    required: false,
    description: "Ingredientes que deben incluir (separados por comas)",
  })
  @ApiQuery({
    name: "exclude",
    required: false,
    description: "Ingredientes que deben excluir (separados por comas)",
  })
  @ApiQuery({
    name: "name",
    required: false,
    description: "Nombre de receta a buscar",
  })
  @ApiQuery({
    name: "userId",
    required: false,
    description: "IDs de usuarios creadores (separados por comas)",
  })
  @ApiQuery({
    name: "category",
    required: false,
    description: "Categorías de recetas a buscar (separadas por comas)",
  })
  @ApiQuery({
    name: "onlyApproved",
    required: false,
    type: Boolean,
    description: "Solo recetas aprobadas (por defecto: true)",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de recetas filtradas obtenida exitosamente",
  })
  async getFilteredByIngredients(
    @Query("include") include: string,
    @Query("exclude") exclude: string,
    @Query("name") name: string,
    @Query("userId") userId: string,
    @Query("category") category: string,
    @Query("onlyApproved") onlyApproved: string = "false"
  ) {
    const includeArray = include ? include.split(",") : [];
    const excludeArray = exclude ? exclude.split(",") : [];
    const userIdArray = userId ? userId.split(",") : [];
    const categoryArray = category ? category.split(",") : [];
    const onlyApprovedBool = onlyApproved.toLowerCase() === "true";

    return this.recipesService.getFilteredByIngredients(
      includeArray,
      excludeArray,
      name,
      userIdArray,
      categoryArray,
      onlyApprovedBool
    );
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener una receta por ID" })
  @ApiParam({ name: "id", description: "ID de la receta" })
  @ApiResponse({ status: 200, description: "Receta obtenida exitosamente" })
  @ApiResponse({ status: 404, description: "Receta no encontrada" })
  async getById(@Param("id") id: string) {
    return this.recipesService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: "Crear una nueva receta" })
  @ApiBody({ type: CreateRecipeDto })
  @ApiResponse({ status: 201, description: "Receta creada exitosamente" })
  @ApiResponse({ status: 400, description: "Datos de la receta inválidos" })
  async create(@Body() dto: CreateRecipeDto) {
    return this.recipesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Actualizar una receta existente" })
  @ApiParam({ name: "id", description: "ID de la receta a actualizar" })
  @ApiBody({ type: UpdateRecipeDto })
  @ApiResponse({ status: 200, description: "Receta actualizada exitosamente" })
  @ApiResponse({ status: 404, description: "Receta no encontrada" })
  async update(@Param("id") id: string, @Body() dto: UpdateRecipeDto) {
    return this.recipesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar una receta" })
  @ApiParam({ name: "id", description: "ID de la receta a eliminar" })
  @ApiResponse({ status: 200, description: "Receta eliminada exitosamente" })
  @ApiResponse({ status: 404, description: "Receta no encontrada" })
  async delete(@Param("id") id: string) {
    return this.recipesService.delete(id);
  }

  @Put(":id/approve")
  @ApiOperation({ summary: "Aprobar una receta" })
  @ApiParam({ name: "id", description: "ID de la receta a aprobar" })
  @ApiResponse({ status: 200, description: "Receta aprobada exitosamente" })
  @ApiResponse({ status: 404, description: "Receta no encontrada" })
  async approveRecipe(@Param("id") id: string) {
    return this.recipesService.approveRecipe(id);
  }

  @Post(":id/ratings")
  @ApiOperation({ summary: "Agregar una calificación a una receta" })
  @ApiParam({ name: "id", description: "ID de la receta a calificar" })
  @ApiBody({ type: RatingDto })
  @ApiResponse({
    status: 201,
    description: "Calificación agregada exitosamente",
  })
  @ApiResponse({ status: 404, description: "Receta no encontrada" })
  async addRating(@Param("id") id: string, @Body() rating: RatingDto) {
    return this.recipesService.addRating(id, rating);
  }

  @Put(":recipeId/ratings/:ratingId")
  @ApiOperation({
    summary: "Actualizar calificación de una receta",
    description:
      "Actualiza la puntuación y/o comentario de una calificación existente. Solo el usuario que creó la calificación puede modificarla.",
  })
  @ApiParam({
    name: "recipeId",
    description: "ID de la receta",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiParam({
    name: "ratingId",
    description: "ID de la calificación a actualizar",
    example: "507f1f77bcf86cd799439012",
  })
  @ApiBody({
    type: UpdateRatingDto,
    description: "Datos de la actualización de la calificación",
  })
  @ApiResponse({
    status: 200,
    description: "Calificación actualizada exitosamente",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 200 },
        message: {
          type: "string",
          example: "Calificación actualizada exitosamente",
        },
        data: {
          type: "object",
          description: "Receta actualizada con la calificación modificada",
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Receta o calificación no encontrada",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 404 },
        message: {
          type: "string",
          example: "Calificación no encontrada para este usuario",
        },
        error: { type: "string", example: "Not Found" },
      },
    },
  })
  async updateRating(
    @Param("recipeId") recipeId: string,
    @Param("ratingId") ratingId: string,
    @Body() dto: UpdateRatingDto
  ) {
    const recipe = await this.recipesService.updateRating(
      recipeId,
      ratingId,
      dto.userId,
      dto
    );
    return {
      statusCode: HttpStatus.OK,
      message: "Calificación actualizada exitosamente",
      data: recipe,
    };
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Obtener recetas de un usuario específico" })
  @ApiParam({
    name: "userId",
    description: "ID del usuario",
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "Recetas obtenidas exitosamente",
    type: [Recipe],
  })
  @ApiResponse({
    status: 404,
    description: "Usuario no encontrado",
  })
  async getRecipesByUser(@Param("userId") userId: string) {
    return this.recipesService.getRecipesByUser(userId);
  }
}
