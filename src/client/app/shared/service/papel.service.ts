import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import {Operacao} from '../../shared/entity/operacao';

import { Papel } from '../entity/papel';
import { URL_ATIVAR_DESATIVAR_PAPEL } from '../../common/url_const';
import { URL_RECUPERAR_TODOS_PAPEIS } from '../../common/url_const';
import { URL_RECUPERAR_PAPEIS_ATIVO } from '../../common/url_const';


@Injectable()
export class PapelService {

    constructor(private http: Http) {}

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public ativarDesativarPapel(papel: Papel): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(papel);

        return this.http.post(URL_ATIVAR_DESATIVAR_PAPEL, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public recuperarTodosPapeis(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_TODOS_PAPEIS, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.text()));
    }

    public recuperarPapeisAtivo(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PAPEIS_ATIVO, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.text()));
    }

}
