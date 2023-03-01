import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("NESTJS APP")
    .setDescription("Documentation REST API")
    .setVersion("1.0.0")
    .addTag("nest.js app")
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  //await app.listen(3000);
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
