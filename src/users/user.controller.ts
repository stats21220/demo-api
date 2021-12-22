import {NextFunction, Request, Response} from 'express';
import {BaseController} from '../common/base.controller';
import {HttpErrorClass} from '../errors/http-error.class';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {ILogger} from '../logger/logger.interface';
import 'reflect-metadata'
import {IUserController} from './user.controller.interface';


@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService)
        this.bindRoutes([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login}
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HttpErrorClass(401, 'Ошибка авторизации', '/login'))
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok<string>(res, 'register')
        next()
    }
}
