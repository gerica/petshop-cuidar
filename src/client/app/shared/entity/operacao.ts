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

    public converterStringToDate(): void {
        if ( typeof this.data === 'string' ) {
            let temp: string = '' + this.data;

            let ano: number = parseInt( temp.substring( 0, 4 ) );
            let mes: number = parseInt( temp.substring( 5, 7 ) ) - 1;
            let dia: number = parseInt( temp.substring( 8, 10 ) );
            this.data = new Date( ano, mes, dia );
        }
    }
}
