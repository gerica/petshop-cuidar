import { URL_BACK_END } from './../../../common/url_const';
import { Pessoa } from './../../entity/pessoa/pessoa';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇOS DE PESSOA
const URL_PESSOA = URL_BACK_END + 'pessoa/';
const URL_GRAVAR_PESSOA: string = URL_PESSOA + 'gravar';
const URL_RECUPERAR_PESSOAS: string = URL_PESSOA + 'recuperarTodos';
const URL_RECUPERAR_PESSOA_POR_ID: string = URL_PESSOA + 'recuperarPorId';


@Injectable()
export class PessoaService {

    constructor(private http: Http) { }

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public gravar(pessoa: Pessoa): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        this.prepararDados(pessoa);

        let body = JSON.stringify(pessoa);

        return this.http.post(URL_GRAVAR_PESSOA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public recuperarPessoas(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PESSOAS, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public recuperarPessoaPorId(idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PESSOA_POR_ID + '/' + idPessoa, { headers: contentHeaders })
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

    private prepararDados(pessoa: Pessoa): void {
        if (typeof pessoa.dtNascimento === 'string') {
            let temp: string = '' + pessoa.dtNascimento;

            let ano: number = parseInt(temp.substring(0, 4));
            let mes: number = parseInt(temp.substring(5, 7)) - 1;
            let dia: number = parseInt(temp.substring(8, 10));
            pessoa.dtNascimento = new Date(ano, mes, dia);
        }
    }

}