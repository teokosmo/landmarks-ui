import { AppConstants } from '@app/app-constants';

export class AppUtils {

  static logMsg(msg: any, logLevel: string = AppConstants.logLevel.silly): void {
    console[logLevel](
      this.getLogTimestamp(new Date()) + ' [' + logLevel + '] ' + msg
    );
  }

  static getLogTimestamp(date: Date): string {
    return (
      this.addZero(date.getHours(), 2) +
      ':' +
      this.addZero(date.getMinutes(), 2) +
      ':' +
      this.addZero(date.getSeconds(), 2) +
      '.' +
      this.addZero(date.getMilliseconds(), 3)
    );
  }

  static addZero(x, n): string {
    while (x.toString().length < n) {
      x = '0' + x;
    }
    return x;
  }
}
