import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("API de Recetas")
    .setDescription("Documentación de la API para gestionar recetas y usuarios")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📄 Swagger disponible en: http://localhost:${PORT}/api`);
}
bootstrap();
