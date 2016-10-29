// BACK - END, SERVIÇOS
const URL_BACK_END: string = 'http://localhost:8080/investimentoRestFul/';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_AUTH: string = URL_BACK_END + 'auth';
export const URL_REGISTRAR: string = URL_BACK_END + 'registrarUsuario';

// SERVIÇOS DE USUAŔIO
export const URL_ALTERAR_USUARIO: string = URL_BACK_END + 'alterarUsuario';

// SERVIÇOS DE PAPEL
export const URL_RECUPERAR_PAPEIS_ATIVO: string = URL_BACK_END + 'recuperarPapeisAtivo';
export const URL_RECUPERAR_TODOS_PAPEIS: string = URL_BACK_END + 'recuperarTodosPapeis';
export const URL_ATIVAR_DESATIVAR_PAPEL: string = URL_BACK_END + 'ativarDesativarPapel';

// SERVIÇOS DE OPERACAO
export const URL_SALVAR_OPERACAO: string = URL_BACK_END + 'salvarOperacao';
export const URL_RECUPERAR_OPERACAO_ENTRADA_ABERTA: string = URL_BACK_END + 'recuperarOperacaoEntradaAberta';
