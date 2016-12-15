import { URL_BACK_END } from './../../common/url_const';
import { Usuario } from './../entity/authority/usuario';
import { Role } from './../entity/authority/role';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// SERVIÇOS DE USUAŔIO
export const URL_USUARIO: string = URL_BACK_END + 'usuario/';
export const URL_INCLUIR_USUARIO: string = URL_USUARIO + 'incluir';
export const URL_ALTERAR_USUARIO: string = URL_USUARIO + 'alterar';
export const URL_RECUPERAR_USUARIOS_ATIVO: string = URL_USUARIO + 'recuperarUsuariosAtivo';
export const URL_RECUPERAR_USUARIOS_INATIVO: string = URL_USUARIO + 'recuperarUsuariosInativo';
export const URL_ALTERAR_SENHA: string = URL_USUARIO + 'primeiroLogin';
export const URL_INATIVAR_USUARIO: string = URL_USUARIO + 'inativarUsuario';
export const URL_ATIVAR_USUARIO: string = URL_USUARIO + 'ativarUsuario';
export const URL_RESET_PASSWORD: string = URL_USUARIO + 'resetPassword';

@Injectable()
export class UsuarioService {

    constructor(private http: Http) { }

    createAuthorizationHeader(contentHeaders: Headers) {
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
    }

    public incluirUsuario(usuario: Usuario, roles: Role[]): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let objBody: any = {
            usuario: usuario,
            roles: roles
        };
        let body = JSON.stringify(objBody);

        return this.http.post(URL_INCLUIR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public alterarUsuario(usuario: Usuario, roles: Role[]): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let objBody: any = {
            usuario: usuario,
            roles: roles
        };
        let body = JSON.stringify(objBody);

        return this.http.post(URL_ALTERAR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public inativarUsuario(usuario: Usuario): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(usuario);

        return this.http.post(URL_INATIVAR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public ativarUsuario(usuario: Usuario): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(usuario);

        return this.http.post(URL_ATIVAR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public resetPassword(usuario: Usuario): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(usuario);

        return this.http.post(URL_RESET_PASSWORD, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public recuperarUsuariosAtivo(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_USUARIOS_ATIVO, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.extractData)
            //...errors if any
            .catch(this.handleError);
    }

    public recuperarUsuariosInativo(): Observable<any> {
        let contentHeaders = new Headers();
        this.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_USUARIOS_INATIVO, { headers: contentHeaders })
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
