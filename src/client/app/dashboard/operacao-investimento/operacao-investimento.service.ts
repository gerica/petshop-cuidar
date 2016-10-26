import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import {Operacao} from '../../shared/entity/operacao';

@Injectable()
export class OperacaoInvestimentoService {
    private _urlSalvarOperacao = 'http://localhost:8080/investimentoRestFul/salvarOperacao';  // URL to web api
    private _urlGetAllPapel = 'http://localhost:8080/investimentoRestFul/getAllPapel';    
    private _urlGetAllOperacaoEntrada = 'http://localhost:8080/investimentoRestFul/getAllOperacaoEntrada';    
    
    constructor(private http: Http) { }

    createAuthorizationHeader(contentHeaders:Headers) {        
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');    
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }  
    
    public salvar(operacao): Observable<any>{      
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);   
        let body = JSON.stringify(operacao);        
      
        return this.http.post(this._urlSalvarOperacao, body, { headers: contentHeaders })
                      // ...and calling .json() on the response to return data
                       .map((res:any) => res.json())
                       //...errors if any
                       .catch((error:any) => Observable.throw(error.json()));
     }   

    public getAllPapel(): Observable<any>{
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);   

        return this.http.get(this._urlGetAllPapel, { headers: contentHeaders })
                    // ...sucesso
                    .map((response: Response) => response.json())
                    //...errors if any
                    .catch((error:any) => Observable.throw(error.text()));
     }     

    public getAllOperacaoEntrada(): Observable<any>{
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);   

        return this.http.get(this._urlGetAllOperacaoEntrada, { headers: contentHeaders })
                    // ...sucesso
                    .map((response: Response) => response.json())
                    //...errors if any
                    .catch((error:any) => Observable.throw(error.text()));
     }     


}
