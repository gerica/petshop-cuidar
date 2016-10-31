import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import {Operacao} from '../../shared/entity/operacao';

import { URL_ATUALIZAR_HISTORICO_BMF } from '../../common/url_const';
import { URL_ATUALIZAR_ATUAL_BMF } from '../../common/url_const';


@Injectable()
export class CotacaoService {

    constructor(private http: Http) {}

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public atualizarHistoricoBMF(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_ATUALIZAR_HISTORICO_BMF, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

    public atualizarAtualBMF(): Observable < any > {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_ATUALIZAR_ATUAL_BMF, { headers: contentHeaders })
            // ...sucesso
            .map((response: Response) => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json()));
    }

}
