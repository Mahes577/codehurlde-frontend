export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogFormat = 'json' | 'pretty';

export interface LoggerOptions {
  level?: LogLevel;
  format?: LogFormat;
  prefix?: string;
}

const LEVEL_WEIGHTS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// ANSI color helpers
const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

export class Logger {
  private level: LogLevel;
  private format: LogFormat;
  private prefix?: string;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? (process.env.LOG_LEVEL as LogLevel) ?? 'info';
    this.format = options.format ?? (process.env.LOG_FORMAT as LogFormat) ?? 'pretty';
    this.prefix = options.prefix;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  public setFormat(format: LogFormat): void {
    this.format = format;
  }

  public child(childPrefix: string): Logger {
    const combinedPrefix = this.prefix ? `${this.prefix}:${childPrefix}` : childPrefix;
    return new Logger({
      level: this.level,
      format: this.format,
      prefix: combinedPrefix,
    });
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_WEIGHTS[level] >= LEVEL_WEIGHTS[this.level];
  }

  private output(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();

    if (this.format === 'json') {
      const logObj = {
        timestamp,
        level,
        prefix: this.prefix,
        message,
        ...meta,
      };
      if (level === 'error') {
        process.stderr.write(JSON.stringify(logObj) + '\n');
      } else {
        process.stdout.write(JSON.stringify(logObj) + '\n');
      }
      return;
    }

    // Pretty format
    let levelBadge = `[${level.toUpperCase()}]`;
    switch (level) {
      case 'debug':
        levelBadge = `${colors.gray}[DEBUG]${colors.reset}`;
        break;
      case 'info':
        levelBadge = `${colors.cyan}[INFO]${colors.reset} `;
        break;
      case 'warn':
        levelBadge = `${colors.yellow}[WARN]${colors.reset} `;
        break;
      case 'error':
        levelBadge = `${colors.red}[ERROR]${colors.reset}`;
        break;
    }

    const timeStr = `${colors.dim}${timestamp}${colors.reset}`;
    const prefixStr = this.prefix ? `${colors.magenta}[${this.prefix}]${colors.reset} ` : '';
    let metaStr = '';

    if (meta && Object.keys(meta).length > 0) {
      const parts = Object.entries(meta).map(([k, v]) => {
        let valStr = typeof v === 'object' ? JSON.stringify(v) : String(v);
        return `${colors.dim}${k}=${colors.reset}${valStr}`;
      });
      metaStr = ` ${colors.gray}(${parts.join(', ')})${colors.reset}`;
    }

    const line = `${timeStr} ${levelBadge} ${prefixStr}${message}${metaStr}\n`;
    if (level === 'error') {
      process.stderr.write(line);
    } else {
      process.stdout.write(line);
    }
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    this.output('debug', message, meta);
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this.output('info', message, meta);
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this.output('warn', message, meta);
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    this.output('error', message, meta);
  }
}

export const logger = new Logger();
