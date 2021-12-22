import {NextFunction, Request, Response} from 'express';
import {IExceptionFilter} from './exception.filter.interface';
import {HttpErrorClass} from './http-error.class';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {ILogger} from '../logger/logger.interface';
import 'reflect-metadata'


@injectable()
export class ExceptionFilter implements IExceptionFilter {
    constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    }

    catch(err: Error | HttpErrorClass, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpErrorClass) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`)
            res.status(err.statusCode).send({err: err.message})
        } else {
            this.logger.error(`${err.message}`)
            res.status(500).send({err: err.message})
        }
    }
}
