import {Logger} from 'tslog'
export class LoggerService {
    private logger: Logger

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false
        })
    }
    log(...args: unknown[]) {
        this.logger.info(...args)
    }
    error(...args: unknown[]) {
        // отправка в sentry / rollbar(сервисы) для логирования ошибок
        this.logger.error(...args)
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}
// абстракция над логером нужна для скрытия настроек конфигурации
// и для добавления каких либо обработок

// конфигурируемость и расишряемость над логером
