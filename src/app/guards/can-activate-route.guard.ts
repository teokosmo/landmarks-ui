import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AppVariables } from '@app/common/app-variables';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  {
    if (AppVariables.userSessionToken === '') {
      return this.router.parseUrl('/login');
    } else {
      return true;
    }
  }
}
