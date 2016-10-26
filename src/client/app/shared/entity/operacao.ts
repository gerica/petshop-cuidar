import {Papel} from './papel';

export class Operacao {
	data: Date;	
	tipoOperacao: string;
	precoUnitario: number;
	quantidade: number;
	despesa: number;
	observacao: string;
	papel: Papel;

	totalOperacao: number;
}