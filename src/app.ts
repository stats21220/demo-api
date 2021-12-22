import express, {Express} from 'express';
import {Server} from 'node:http'
import {LoggerService} from './logger/logger.service';
import {UserController} from './users/user.controller';
import {ExceptionFilter} from './errors/exception.filter';

export class App {
    private app: Express //интерфейс описывающий типы) приложения
    server: Server
    port: number
    logger: LoggerService
    userController: UserController
    exceptionFilter: ExceptionFilter

    constructor(
        logger: LoggerService,
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express() // само приложение
        this.port = 8000
        this.logger = logger
        this.userController = userController
        this.exceptionFilter = exceptionFilter
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
