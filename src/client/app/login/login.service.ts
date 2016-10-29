import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Usuario} from '../shared/entity/usuario';

// URL BACK END
import { URL_AUTH } from '../common/url_const';


@Injectable()
export class LoginService {
    private _url = URL_AUTH;

    constructor(private http: Http) { }

    public login(usuario: Usuario): Observable<any> {
      let body = JSON.stringify(usuario);

      return this.http.post(this._url, body, { headers: contentHeaders })
                      // ...and calling .json() on the response to return data
                       .map((res:Response) => res.json())
                       //...errors if any
                       .catch((error:any) => Observable.throw(error.text()));
     }

}
