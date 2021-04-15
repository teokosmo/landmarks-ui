import { Constants } from '@app/common/constants';
import { environment } from '@env/environment';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppVariables } from './app-variables';

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

  static isUserLoggedIn(): boolean {
    return AppVariables.userSessionToken !== ''/*  || !environment.production */;
  }

  static setUserSessionData(username, sessionToken): void {
    AppVariables.username = username;
    AppVariables.userSessionToken = sessionToken;
  }

  static clearUserSessionData(): void {
    AppVariables.username = '';
    AppVariables.userSessionToken = '';
  }

  static sortObjectOnProperty(
    property: string,
    direction: 'ASC' | 'DESC' = 'ASC'
  ): any {
    return (a: any, b: any) => {
      switch (direction) {
        case 'ASC':
          return a[property] < b[property]
            ? -1
            : a[property] > b[property]
              ? 1
              : 0;
        case 'DESC':
          return a[property] > b[property]
            ? -1
            : a[property] < b[property]
              ? 1
              : 0;
      }
    };
  }

  static isObjectEmpty(obj): boolean {
    obj = obj || {};
    return Object.keys(obj).length === 0;
  }

  static showLoader(): void {
    interval(1)
      .pipe(take(1))
      .subscribe(() => {
        AppVariables.isLoaderVisible = true;
      });
  }

  static hideLoader(): void {
    interval(1)
      .pipe(take(1))
      .subscribe(() => {
        AppVariables.isLoaderVisible = false;
      });
  }

}
