import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class  userGuardGuard implements CanActivate{ 
  constructor(private cookie: CookieService, private actRout:Router){}
  canActivate: CanActivateFn = (route, state) => {
  const ckie = true//this.cookie.check('token')
  if(!ckie){
    this.actRout.navigate(['/','login'])
  }
  return true;
};
}
