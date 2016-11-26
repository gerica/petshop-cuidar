// BACK - END, SERVIÇOS
const URL_BACK_END: string = 'http://localhost:8180/petshopCuidarRest/';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_AUTH: string = URL_BACK_END + 'auth';
export const URL_REGISTRAR: string = URL_BACK_END + 'registrarUsuario';

// SERVIÇOS DE USUAŔIO
export const URL_ALTERAR_USUARIO: string = URL_BACK_END + 'alterarUsuario';

// SERVIÇOS DE PAPEL
export const URL_RECUPERAR_PAPEIS_ATIVO: string = URL_BACK_END + 'recuperarPapeisAtivo';
export const URL_RECUPERAR_TODOS_PAPEIS: string = URL_BACK_END + 'recuperarTodosPapeis';
export const URL_ATIVAR_DESATIVAR_PAPEL: string = URL_BACK_END + 'ativarDesativarPapel';
export const URL_RECUPERAR_BALANCO_HOJE: string = URL_BACK_END + 'recuperarBalancoHoje';
export const URL_RECUPERAR_PAPEIS_OPERECAO: string = URL_BACK_END + 'recuperarPapeisOperacao';

// SERVIÇOS DE OPERACAO
export const URL_SALVAR_OPERACAO_ENTRADA: string = URL_BACK_END + 'salvarOperacaoEntrada';
export const URL_SALVAR_OPERACAO_SAIDA: string = URL_BACK_END + 'salvarOperacaoSaida';
export const URL_RECUPERAR_OPERACAO_ENTRADA_ABERTA: string = URL_BACK_END + 'recuperarOperacaoEntradaAberta';
export const URL_RECUPERAR_OPERACAO_SAIDA: string = URL_BACK_END + 'recuperarOperacaoSaida';
export const URL_EXCLUIR_OPERACAO_ENTRADA: string = URL_BACK_END + 'excluirOperacaoEntrada';
export const URL_EDITAR_OPERACAO_ENTRADA: string = URL_BACK_END + 'editarOperacaoEntrada';
export const URL_RECUPERAR_RELATORIO_SAIDA: string = URL_BACK_END + 'recuperarRelatorioSaida';


// SERVIÇOS DE CONFIGURAÇÃO ANALISE COTAÇÃO
export const URL_RECUPERAR_CONFIGURACAO_ANALISE_COTACAO: string = URL_BACK_END + 'recuperarConfiguracaoAnalise';
export const URL_SALVAR_CONFIGURACAO_ANALISE_COTACAO: string = URL_BACK_END + 'salvarConfiguracaoAnalise';
export const URL_RECUPERAR_ULTIMA_COTACAO: string = URL_BACK_END + 'recuperarUltimaCotacao';
export const URL_RECUPERAR_COTACAO_POR_DATA: string = URL_BACK_END + 'recuperarCotacaoPorData';
export const URL_RECUPERAR_COTACOES_POR_PAPEL: string = URL_BACK_END + 'recuperarCotacoesPorPapel';
export const URL_RECUPERAR_BALANCO_CARTEIRA: string = URL_BACK_END + 'recuperarBalancoCarteira';

// SERVIÇOS DE ATUALIZAR COTAÇÃO COM A BOVESPA
export const URL_ATUALIZAR_HISTORICO_BMF: string = URL_BACK_END + 'atualizarHistoricoBMF';
export const URL_ATUALIZAR_ATUAL_BMF: string = URL_BACK_END + 'atualizarAtualBMF';
