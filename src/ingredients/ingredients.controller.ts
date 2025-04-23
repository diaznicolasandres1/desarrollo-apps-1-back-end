import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { IngredientAlreadyExistsException } from "./exceptions/ingredient-already-exists.exception";
import { IngredientsService } from "./ingredients.service";
import { Ingredient } from "./schemas/ingredients.schema";

@ApiTags("Ingredients")
@Controller("ingredients")
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @ApiOperation({ summary: "Obtener todos los ingredientes" })
  @ApiResponse({
    status: 200,
    description: "Lista de ingredientes obtenida",
    type: [Ingredient],
  })
  findAll(): Promise<Ingredient[]> {
    return this.ingredientsService.findAll();
  }

  @Get("/name/:name")
  @ApiOperation({ summary: "Obtener un ingrediente por nombre" })
  @ApiParam({ name: "name", description: "Nombre del ingrediente" })
  @ApiResponse({
    status: 200,
    description: "Ingrediente encontrado",
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: "Ingrediente no encontrado" })
  findByName(@Param("name") name: string): Promise<Ingredient> {
    return this.ingredientsService.findByName(name);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener un ingrediente por ID" })
  @ApiParam({ name: "id", description: "ID del ingrediente" })
  @ApiResponse({
    status: 200,
    description: "Ingrediente encontrado",
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: "Ingrediente no encontrado" })
  findById(@Param("id") id: string): Promise<Ingredient> {
    return this.ingredientsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Crear un ingrediente" })
  @ApiBody({ schema: { example: { name: "Tomate" } } })
  @ApiResponse({
    status: 201,
    description: "Ingrediente creado",
    type: Ingredient,
  })
  async create(@Body("name") name: string): Promise<Ingredient> {
    if (await this.ingredientsService.findByName(name)) {
      throw new IngredientAlreadyExistsException(name);
    }

    return this.ingredientsService.create(name);
  }

  @Put(":id")
  @ApiOperation({ summary: "Actualizar un ingrediente" })
  @ApiParam({ name: "id", description: "ID del ingrediente" })
  @ApiBody({ schema: { example: { name: "Zanahoria" } } })
  @ApiResponse({
    status: 200,
    description: "Ingrediente actualizado",
    type: Ingredient,
  })
  @ApiResponse({ status: 404, description: "Ingrediente no encontrado" })
  update(
    @Param("id") id: string,
    @Body("name") name: string
  ): Promise<Ingredient> {
    return this.ingredientsService.update(id, name);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar un ingrediente" })
  @ApiParam({ name: "id", description: "ID del ingrediente" })
  @ApiResponse({ status: 200, description: "Ingrediente eliminado" })
  @ApiResponse({ status: 404, description: "Ingrediente no encontrado" })
  delete(@Param("id") id: string): Promise<void> {
    return this.ingredientsService.delete(id);
  }
}
