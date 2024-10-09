import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';
import {PayloadStatus} from '@shared/models/api/payload';
import {Request} from '@shared/models/api/request';
import {Response} from '@shared/models/api/response';

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiErrorFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const httpArgumentsHost = host.switchToHttp();

    const request = httpArgumentsHost.getRequest<Request>();
    const response = httpArgumentsHost.getResponse<Response>();

    const method = request.method.toUpperCase();
    const path = request.path.toLowerCase();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const time = request.start ? Date.now() - request.start : 0;
    const exceptionResponse = exception.getResponse ? (exception.getResponse() as string | any) : null;

    let data;
    if (typeof exceptionResponse === 'string') {
      data = exceptionResponse;
    } else if (exceptionResponse && exceptionResponse.message) {
      data = exceptionResponse.message;
    } else {
      data = exceptionResponse;
    }

    this.logger.log(`${method} ${path} => ${status}. Took ${time} ms`);

    response.status(status).json({
      status: PayloadStatus.FAIL,
      message: exception.message,
      data: data || null,
    });
  }
}
