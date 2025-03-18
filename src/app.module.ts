import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { RecipesModule } from "./recipes/recipes.module";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    // que dios me perdone, dejo el connection string aca
    MongooseModule.forRoot(
      "mongodb+srv://desaapps1:desaapps1@cluster0.awxpf.mongodb.net/rcp001?retryWrites=true&w=majority&appName=Cluster0",
    ),
    RecipesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
