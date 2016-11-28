import { UsuarioRole } from './usuarioRole';
export class Usuario {
	email: string;
	username : string;
	password : string;
	passwordrp : string;
	authorities: UsuarioRole[];
}
