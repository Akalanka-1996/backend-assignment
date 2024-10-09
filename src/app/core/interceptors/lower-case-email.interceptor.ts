import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class LowerCaseEmailInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.body && request.body.email) {
      request.body.email = request.body.email.toLowerCase();
    }
    return next.handle().pipe(
      map(data => {
        return data;
      }),
    );
  }
}