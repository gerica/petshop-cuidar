import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { URL_ATUALIZAR_HISTORICO_BMF } from '../../common/url_const';
import { URL_ATUALIZAR_ATUAL_BMF } from '../../common/url_const';
import { URL_RECUPERAR_ULTIMA_COTACAO } from '../../common/url_const';
import { URL_RECUPERAR_COTACAO_POR_DATA } from '../../common/url_const';
import { URL_RECUPERAR_COTACOES_POR_PAPEL } from '../../common/url_const';
import { URL_RECUPERAR_BALANCO_CARTEIRA } from '../../common/url_const';

@Injectable()
export class CotacaoService {

    constructor( private http: Http ) { }

    createAuthorizationHeader( contentHeaders: Headers ) {
        contentHeaders.append( 'Accept', 'application/json' );
        contentHeaders.append( 'Content-Type', 'application/json' );
        contentHeaders.append( 'X-Auth-Token', localStorage.getItem( 'id_token' ) );
    }

    public atualizarHistoricoBMF(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_ATUALIZAR_HISTORICO_BMF, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public atualizarAtualBMF(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_ATUALIZAR_ATUAL_BMF, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public recuperarUltimaCotacao( idPapel: number ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_RECUPERAR_ULTIMA_COTACAO + '/' + idPapel, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public recuperarCotacaoPorData( data: Date ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_RECUPERAR_COTACAO_POR_DATA + '/' + data, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public recuperarCotacoesPorPapel( idPapel: number ): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_RECUPERAR_COTACOES_POR_PAPEL + '/' + idPapel, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map( this.extractData )
            //...errors if any
            .catch( this.handleError );
    }

    public recuperarBalancoCarteira(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader( contentHeaders );

        return this.http.get( URL_RECUPERAR_BALANCO_CARTEIRA, { headers: contentHeaders })
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
