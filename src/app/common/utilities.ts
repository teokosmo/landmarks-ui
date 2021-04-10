import { Constants } from '@app/common/constants';

export class Utilities {

  static logMsg(msg: any, logLevel: string = Constants.logLevel.log): void {
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

  static isDefined(variable: any): boolean {
    return variable != null;
  }

}