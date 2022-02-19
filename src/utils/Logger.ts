export const LOG_COLOR = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m',
} as const;

class Logger {
    static isProduction = process.env['NODE_ENV'] === 'production';

    static info(...data: unknown[]): void {
        console.info(LOG_COLOR.FgGreen, Logger.getTime(), ...data);
    }

    static getTime(): string {
        const now = new Date();
        return `[${now.toLocaleDateString()} - ${now.toLocaleTimeString()}]`;
    }

    static debug(...data: unknown[]): void {
        if (!Logger.isProduction) {
            console.debug(LOG_COLOR.FgYellow, Logger.getTime(), ...data);
        }
    }

    static error(data: unknown[]): void {
        console.error(LOG_COLOR.FgRed, Logger.getTime(), ...data);
    }
}

export default Logger;
