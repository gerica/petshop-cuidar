import { Papel } from './papel';
import { OperacaoSaida } from './operacao-saida';
import { Cotacao } from './cotacao';

export class Operacao {
    id: number;
    data: Date;
    tipoOperacao: string;
    precoUnitario: number;
    quantidade: number;
    despesa: number;
    observacao: string;
    papel: Papel;

    // campos utilizados em tela
    totalOperacao: number;
    saldoOperacao: number;
    operacoesSaida: OperacaoSaida[];
    flagShow: boolean = false;
    ultimaCotacao: Cotacao = new Cotacao();
}
