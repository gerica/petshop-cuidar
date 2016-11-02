import { Papel } from './papel';
import { OperacaoSaida } from './operacao-saida';

export class Operacao {
    id: number;
    data: Date;
    tipoOperacao: string;
    precoUnitario: number;
    quantidade: number;
    despesa: number;
    observacao: string;
    papel: Papel;

    totalOperacao: number;
    saldoOperacao: number;
    operacoesSaida: OperacaoSaida[];
    flagShow: boolean = false;
}
