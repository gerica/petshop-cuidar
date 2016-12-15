import { URL_BACK_END } from './../../../common/url_const';
import { Endereco } from './../../entity/pessoa/endereco';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_ENDERECO: string = URL_BACK_END + 'pessoa/';
export const URL_GRAVAR: string = URL_ENDERECO + 'gravarEndereco';
export const URL_EXCUIR: string = URL_ENDERECO + 'excluirEndereco';
export const URL_POR_PESSOA_ID: string = URL_ENDERECO + 'recuperarEnderecoPorPessoaId';


@Injectable()
export class EnderecoService {

    constructor(private http: Http) { }

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public gravar(endereco: Endereco, idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            endereco: endereco,
            // cidade: endereco.cidade,
            idPessoa: idPessoa
        };
        let body = JSON.stringify(objBody);
        console.log('valores', body);
        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public excluir(idEndereco: number): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idEndereco);
        console.log('valores', body);
        return this.http.post(URL_EXCUIR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public recuperarEnderecoPorPessoaId(idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_POR_PESSOA_ID + '/' + idPessoa, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(error.json());
    }
}
