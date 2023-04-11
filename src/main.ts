import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from './application/app.module';

// Services
import { ConfigService } from './config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}

bootstrap();
