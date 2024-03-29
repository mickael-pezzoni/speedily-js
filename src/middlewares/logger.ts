import { NextFunction, Request, Response } from 'express';

import Logger from '../classes/Logger';

/**
 *
 *
 * @param {[number, number]} start
 * @return {*}  {number}
 */
function getDurationTime(start: [number, number]): number {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}
/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function logRequest(req: Request, res: Response, next: NextFunction): void {
    const start = process.hrtime();
    res.on('finish', () => {
        const durationInMilliseconds = getDurationTime(start);
        Logger.info(
            `${req.method} ${
                req.originalUrl
            } ⌛ [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`
        );
    });

    res.on('close', () => {
        const durationInMilliseconds = getDurationTime(start);
        Logger.info(
            `${req.method} ${
                req.originalUrl
            } ⌛ [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`
        );
    });

    next();
}

export default logRequest;
