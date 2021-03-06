import { Injectable } from '@angular/core';
import { Piscine, Programmation } from './piscine.model';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';




@Injectable()
export class PiscineService {

  //private programmationUrl = 'http://localhost:3001/api/piscine/programmation';  // URL to web API
  private programmationUrl =  '';
  private headers : Headers;
  private options : RequestOptions;
  constructor(private http: Http) {
    //TODO set Authorization headers properties : 'Basic ' + new Buffer("toto:titi").toString('base64');
    this.programmationUrl = localStorage.getItem("urlServer") || '';
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    //this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.headers.append('Authorization', 'Basic ' + btoa('domobox:domoboxpw'));   
    this.options = new RequestOptions({ headers: this.headers });
  }

  getProgrammation(): Observable<Programmation> {
    
    return this.http.get(this.programmationUrl,this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    if (!body) {
      return new Programmation();
    } else {
      let prog = new Programmation();
      prog.plagesHoraires = body.plagesHoraires;
      return prog;
    }
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("[piscine.service] " +errMsg);
    return Observable.throw(errMsg);
  }

  update(prog: Programmation) {
    return this.http.post(this.programmationUrl, JSON.stringify(prog), this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
