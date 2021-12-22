import express, {Express} from 'express';
import {Server} from 'node:http'
import {UserController} from './users/user.controller';
import {ExceptionFilter} from './errors/exception.filter';
import {ILogger} from './logger/logger.interface';
import {inject, injectable} from 'inversify';
import {TYPES} from './types';
import 'reflect-metadata'


@injectable()
export class App {
    private app: Express //интерфейс описывающий типы) приложения
    server: Server
    port: number
    // logger: ILogger
    // userController: UserController
    // exceptionFilter: ExceptionFilter

    constructor(
        @inject(TYPES.ILogger) public logger: ILogger,
        @inject(TYPES.UserController) public userController: UserController,
        @inject(TYPES.ExceptionFilter) public exceptionFilter: ExceptionFilter
    ) {
        this.app = express() // само приложение
        this.port = 8000
    }

    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes()
        this.useExceptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
    }
}
