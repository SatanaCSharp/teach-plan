import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from '../guards';

export function AuthRequired() {
  return applyDecorators(UseGuards(AuthJwtGuard));
}
