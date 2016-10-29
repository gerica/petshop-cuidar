import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Operacao } from '../../shared/entity/operacao';

import { URL_SALVAR_OPERACAO } from '../../common/url_const';
import { URL_RECUPERAR_PAPEIS_ATIVO } from '../../common/url_const';
import { URL_RECUPERAR_OPERACAO_ENTRADA_ABERTA } from '../../common/url_const';

@Injectable()
export class OperacaoInvestimentoService {
    constructor(private http: Http) {}

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public salvar(operacao: Operacao): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(operacao);

        return this.http.post(URL_SALVAR_OPERACAO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public getAllPapel(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PAPEIS_ATIVO, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.text()));
    }

    public getAllOperacaoEntrada(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_OPERACAO_ENTRADA_ABERTA, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.text()));
    }

}
