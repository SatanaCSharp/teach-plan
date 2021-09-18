import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { isArray, isEmpty, isObject } from 'lodash';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        if (
          (isArray(value) && isEmpty(value)) ||
          (isObject(value) && isEmpty(value))
        ) {
          throw new HttpException(
            'Cannot find target target entity',
            HttpStatus.NOT_FOUND,
          );
        }

        return value;
      }),
    );
  }
}
