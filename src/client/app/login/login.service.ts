import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Usuario} from '../shared/entity/usuario';


@Injectable()
export class LoginService {
    private _url = 'http://localhost:8080/investimentoRestFul/auth';    

    constructor(private http: Http) { }    

    public login(usuario): Observable<any>{        
      let body = JSON.stringify(usuario);
      
      return this.http.post(this._url, body, { headers: contentHeaders })
                      // ...and calling .json() on the response to return data
                       .map((res:Response) => res.json())
                       //...errors if any
                       .catch((error:any) => Observable.throw(error.text()));
     }     

}
