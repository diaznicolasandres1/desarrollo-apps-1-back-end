import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { RecipesModule } from "./recipes/recipes.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    // que dios me perdone, dejo el connection string aca
    MongooseModule.forRoot(
      "mongodb+srv://desaapps1:desaapps1@cluster0.awxpf.mongodb.net/rcp001?retryWrites=true&w=majority&appName=Cluster0"
    ),
    RecipesModule,
    UserModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
