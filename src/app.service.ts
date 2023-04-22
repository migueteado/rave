import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBase(): string {
    return 'RAVE is up and running!';
  }
}
