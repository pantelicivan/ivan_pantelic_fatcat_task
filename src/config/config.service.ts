import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string | undefined>;
  private TEST_ENV: boolean;

  constructor() {
    this.TEST_ENV = process.env.NODE_ENV === 'test';
    if (this.TEST_ENV) {
      this.envConfig = dotenv.parse(fs.readFileSync('.env.test'));
      return;
    }
    dotenv.config();
    this.envConfig = process.env;
  }

  /**
   * Returns an ENV entry by key.
   * @param key - Key string.
   * @returns - ENV value.
   */
  get(key: string): string {
    return this.envConfig[key] || '';
  }
}
