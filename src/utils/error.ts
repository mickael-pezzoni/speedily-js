import { HttpError, InternalError } from 'src/classes/HttpError';

/**
 * @description Initiates an HttpError
 * @param error
 * @returns HttpError
 */
export function makeError(error: HttpError | Error | unknown): HttpError {
    if (error instanceof HttpError) {
        return error;
    } else if (error instanceof Error) {
        return new InternalError(error.message);
    } else {
        return new InternalError('Unknow error');
    }
}