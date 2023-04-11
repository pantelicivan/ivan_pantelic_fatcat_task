import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from '../config/config.module';

// Services
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
