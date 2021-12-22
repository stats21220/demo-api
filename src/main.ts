import {App} from './app';
import {LoggerService} from './logger/logger.service';
import {UserController} from './users/user.controller';
import {ExceptionFilter} from './errors/exception.filter';
import {Container, ContainerModule, interfaces} from 'inversify';
import {ILogger} from './logger/logger.interface';
import {TYPES} from './types';
import {IExceptionFilter} from './errors/exception.filter.interface';
import {IUserController} from './users/user.controller.interface';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService)
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
    bind<IUserController>(TYPES.UserController).to(UserController)
    bind<App>(TYPES.Application).to(App)
})

function bootstrap() {
    const appContainer = new Container()
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application)
    app.init()
    return {appContainer, app}
}


export const {app, appContainer} = bootstrap()
