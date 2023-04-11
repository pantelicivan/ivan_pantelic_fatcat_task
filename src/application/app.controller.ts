import { Controller, Get } from '@nestjs/common';

// Services
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findPath(): any {
    const result = this.appService.findPath();

    return result;
  }
}
