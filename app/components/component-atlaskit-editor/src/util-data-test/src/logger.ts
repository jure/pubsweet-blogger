// Duplicate or utils/logger.ts from elements packages

let debugEnabled = false;
let stacktracesEnabled = false;

export function enableLogger(enable: boolean): void {
  debugEnabled = enable;
}

export function enableStacktraces(enable: boolean): void {
  stacktracesEnabled = enable;
}

export function logStacktrace(): void {
  if (stacktracesEnabled) {
    // tslint:disable-next-line:no-console
    console.log(new Error().stack);
  }
}

export default function debug(msg: any, ...args: any[]): void {
  if (debugEnabled) {
    // tslint:disable-next-line:no-console
    console.log(msg, ...args);
  }
}
