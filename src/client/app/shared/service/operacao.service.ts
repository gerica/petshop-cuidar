import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Operacao } from '../../shared/entity/operacao';
import { OperacaoSaida } from '../../shared/entity/operacao-saida';

import { URL_RECUPERAR_OPERACAO_ENTRADA_ABERTA } from '../../common/url_const';
import { URL_RECUPERAR_OPERACAO_SAIDA } from '../../common/url_const';
import { URL_SALVAR_OPERACAO_ENTRADA } from '../../common/url_const';
import { URL_SALVAR_OPERACAO_SAIDA } from '../../common/url_const';
import { URL_EXCLUIR_OPERACAO_ENTRADA } from '../../common/url_const';
import { URL_EDITAR_OPERACAO_ENTRADA } from '../../common/url_const';


@Injectable()
export class OperacaoService {

    constructor(private http: Http) {}

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public gravarOperacaoEntrada(operacao: Operacao): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(operacao);

        return this.http.post(URL_SALVAR_OPERACAO_ENTRADA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public gravarOperacaoSaida(operacao: OperacaoSaida): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(operacao);

        return this.http.post(URL_SALVAR_OPERACAO_SAIDA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public excluirOperacaoEntrada(operacao: Operacao): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(operacao);

        return this.http.post(URL_EXCLUIR_OPERACAO_ENTRADA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public editarOperacaoEntrada(operacao: Operacao): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(operacao);

        return this.http.post(URL_EDITAR_OPERACAO_ENTRADA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public recuperarOperacaoEntradaAberta(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_OPERACAO_ENTRADA_ABERTA, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.text()));
    }

    public recuperarOperacaoSaida(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_OPERACAO_SAIDA, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.text()));
    }

}
