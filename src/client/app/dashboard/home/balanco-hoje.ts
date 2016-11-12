import { Operacao } from '../../shared/entity/operacao';

export class BalancoHoje {
    papel: string;
    dataInvestimento: Date;
    valorInvestimento: number;
    totalInvestimento: number;
    dataUltimaCotacao: Date;
    valorUltimaCotacao: number;
    porcentagemLucroPrejuizo: number;
    lucroPrejuizo: number;
    saldoLucroPrejuizo: number;
    operacaoEntrada: Operacao;
}
