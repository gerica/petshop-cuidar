import { Papel } from './papel';
export class Cotacao {
    id: number;
    data: Date;
    abertura: number;
    maxima: number;
    minima: number;
    fechamento: number;
    papel: Papel;
}
