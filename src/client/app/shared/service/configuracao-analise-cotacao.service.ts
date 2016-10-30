import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import {Operacao} from '../../shared/entity/operacao';

import { ConfiguracaoAnaliseCotacoes } from '../entity/configuracaoAnaliseCotacoes';

import { URL_RECUPERAR_CONFIGURACAO_ANALISE_COTACAO } from '../../common/url_const';
import { URL_SALVAR_CONFIGURACAO_ANALISE_COTACAO } from '../../common/url_const';


@Injectable()
export class ConfiguracaoAnaliseCotacaoService {

    constructor(private http: Http) {}

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public salvarConfiguracaoAnalise(configuracao: ConfiguracaoAnaliseCotacoes): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(configuracao);

        return this.http.post(URL_SALVAR_CONFIGURACAO_ANALISE_COTACAO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map((res: any) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public recuperarConfiguracaoAnalise(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_CONFIGURACAO_ANALISE_COTACAO, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.text()));
    }

}
