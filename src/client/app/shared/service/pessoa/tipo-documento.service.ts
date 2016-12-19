import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_UTILS: string = URL_BACK_END + 'utils/';
export const URL_RECUPERAR_TODOS: string = URL_UTILS + 'recuperarTodosTipoDocumento';


@Injectable()
export class TipoDocumentoService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public recuperarTodosTipoDocumento(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_TODOS, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
