import {NextFunction, Request, Response} from 'express';
import {BaseController} from '../common/base.controller';
import {LoggerService} from '../logger/logger.service';

export class UserController extends BaseController {
    constructor(
        logger: LoggerService
    ) {
        super(logger)
        this.bindRoutes([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login}
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok<string>(res, 'login')
        next()
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok<string>(res, 'register')
        next()
    }
}

const user = new UserController(new LoggerService())
