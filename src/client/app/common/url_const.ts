// BACK - END, SERVIÇOS
const URL_BACK_END: string = 'http://localhost:8180/petshopCuidarRest/';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_AUTH: string = URL_BACK_END + 'auth';
export const URL_REGISTRAR: string = URL_AUTH + 'registrarUsuario';

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

// SERVIÇOS DE ROLE
export const URL_ROLE = URL_BACK_END + 'role/';
export const URL_RECUPERAR_ROLES: string = URL_ROLE + 'recuperarTodos';

// SERVIÇOS UTILS
export const URL_UTILS = URL_BACK_END + 'utils/';

export const URL_RECUPERAR_ESTADOS: string = URL_UTILS + 'estado';
export const URL_RECUPERAR_CIDADE_POR_ESTADO: string = URL_UTILS + 'cidade';