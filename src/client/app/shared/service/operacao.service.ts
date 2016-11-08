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
import { URL_RECUPERAR_RELATORIO_SAIDA } from '../../common/url_const';


@Injectable()
export class OperacaoService {

    constructor( private http: Http ) { }

    createAuthorizationHeader( contentHeaders: Headers ) {
        contentHeaders.append( 'Accept', 'application/json' );
        contentHeaders.append( 'Content-Type', 'application/json' );
        contentHeaders.append( 'X-Auth-Token', localStorage.getItem( 'id_token' ) );
    }

    public gravarOperacaoEntrada( operacao: Operacao ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );
        operacao.prepararDadosParaServidor();
        let body = JSON.stringify( operacao );

        return this.http.post( URL_SALVAR_OPERACAO_ENTRADA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public gravarOperacaoSaida( operacao: OperacaoSaida ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );
        operacao.prepararDadosParaServidor();
        let body = JSON.stringify( operacao );

        return this.http.post( URL_SALVAR_OPERACAO_SAIDA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public excluirOperacaoEntrada( operacao: Operacao ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );
        let body = JSON.stringify( operacao );

        return this.http.post( URL_EXCLUIR_OPERACAO_ENTRADA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public editarOperacaoEntrada( operacao: Operacao ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );
        operacao.prepararDadosParaServidor();
        let body = JSON.stringify( operacao );

        return this.http.post( URL_EDITAR_OPERACAO_ENTRADA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public recuperarOperacaoEntradaAberta(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_RECUPERAR_OPERACAO_ENTRADA_ABERTA, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public recuperarOperacaoSaida(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_RECUPERAR_OPERACAO_SAIDA, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public recuperarRelatorioSaida( ano: number, mes: number, idPapel: number ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_RECUPERAR_RELATORIO_SAIDA + '/' + ano + '/' + mes + '/' + idPapel, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    private extractData( res: Response ) {
        return res.json();
    }
    private handleError( error: Response | any ) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if ( error instanceof Response ) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify( body );
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error( errMsg );
        return Observable.throw( error.json() );
    }

}
