import express, {Express} from 'express';
import {Server} from 'node:http'
import {LoggerService} from './logger/logger.service';
import {UserController} from './users/user.controller';

export class App {
    private app: Express //интерфейс описывающий типы) приложения
    server: Server
    port: number
    logger: LoggerService
    userController: UserController

    constructor(
        logger: LoggerService,
        userController: UserController
    ) {
        this.app = express() // само приложение
        this.port = 8000
        this.logger = logger
        this.userController = userController
    }

    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    public async init() {
        this.useRoutes()
        this.server = this.app.listen(this.port)
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
    }
}
