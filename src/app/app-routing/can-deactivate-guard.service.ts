import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import { Router } from '@angular/router';

export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private _router:Router){}
  canDeactivate(component: CanComponentDeactivate) {
    console.log("canDeactive");
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}