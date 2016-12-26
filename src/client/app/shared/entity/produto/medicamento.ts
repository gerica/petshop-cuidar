import { MedicamentoTipoPet } from './medicamento-tipo-pet';
import { TipoPet } from './../pet/tipoPet';

export class Medicamento {
    id: number;
    marca: string;
    nome: string;
    medicamentoTipoPet: MedicamentoTipoPet[];
    categoria: string;
    porte: string;
    faixaIdade: string;
}
