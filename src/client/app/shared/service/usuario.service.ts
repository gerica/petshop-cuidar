import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import {Operacao} from '../../shared/entity/operacao';

import { Usuario } from '../../shared/entity/usuario';
import { URL_ALTERAR_USUARIO } from '../../common/url_const';



@Injectable()
export class UsuarioService {

    constructor(private http: Http) {}

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public alterarUsuario(usuario: Usuario): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(usuario);

        return this.http.post(URL_ALTERAR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

}
