// BACK - END, SERVIÇOS
const URL_BACK_END: string = 'http://localhost:8180/petshopCuidarRest/';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_AUTH: string = URL_BACK_END + 'auth';
export const URL_REGISTRAR: string = URL_AUTH + 'registrarUsuario';

// SERVIÇOS DE USUAŔIO
export const URL_USUARIO: string = URL_BACK_END + 'usuario/';
export const URL_INCLUIR_USUARIO: string = URL_USUARIO + 'incluirUsuario';
export const URL_ALTERAR_USUARIO: string = URL_USUARIO + 'alterarUsuario';
export const URL_RECUPERAR_USUARIOS_ATIVO: string = URL_USUARIO + 'recuperarUsuariosAtivo';
export const URL_ALTERAR_SENHA: string = URL_USUARIO + 'alterarSenha';

// SERVIÇOS DE ROLE
export const URL_ROLE = URL_BACK_END + 'role/';
export const URL_RECUPERAR_ROLES: string = URL_ROLE + 'recuperarTodos';
