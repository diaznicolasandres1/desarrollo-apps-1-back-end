import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle("API de Recetas")
    .setDescription("API para gestionar recetas de cocina")
    .setVersion("1.0")
    .addTag("Recetas", "Endpoints para gestionar recetas")
    .addTag("Usuarios", "Endpoints para gestionar usuarios")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "API de Recetas - Documentación",
    customfavIcon: "https://nestjs.com/img/favicon.png",
    customJs: [
      'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js'
    ],
    customCssUrl: [
      'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css'
    ],
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
      defaultModelsExpandDepth: 4,
      defaultModelExpandDepth: 4,
      defaultModelRendering: 'example',
      displayOperationId: true
    }
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📚 Documentación de la API en: http://localhost:${PORT}/api`);
}
bootstrap();
