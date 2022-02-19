import { LOG_COLOR } from './../utils/Logger';
import Logger from '../utils/Logger';
import { Middleware } from '../types';
import express from 'express';
import { Controller } from './Controller';
import { middlewares, middlewaresError } from '../middlewares';

export class Server {
    private readonly port: number;
    readonly express: express.Express;
    private readonly controllers: Controller<unknown, unknown, unknown>[] = [];
    private readonly environment =
        process.env['NODE_ENV'] ?? 'Node environment not defined';
    private readonly middlewares: Middleware[] = [];
    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.setGlobalMiddleWare(...middlewares);
    }

    /**
     *
     * @param middlewares
     */
    setGlobalMiddleWare(...middlewares: Middleware[]): void {
        this.middlewares.push(...middlewares);
        this.express.use(...middlewares);
    }

    /**
     *
     * @param controllers
     */
    setControllers(controllers: Controller<unknown, unknown, unknown>[]): void {
        this.controllers.push(...controllers);
        this.controllers.forEach((controller) => {
            this.express.use(controller.endPoint, controller.router);
        });
    }

    /**
     *
     * @param callback
     */
    run(callback?: () => void): void {
        this.express.use(...middlewaresError);

        if (this.controllers.length === 0) {
            throw new Error('`No controller was added');
        }
        this.express.listen(this.port, () => {
            Logger.info(
                `Listening on ${this.port} ${LOG_COLOR.FgBlue} [${this.environment}]`
            );
            if (callback !== undefined) {
                callback();
            }
        });
    }
}