import { Raca } from './raca';
import { Pessoa } from './../pessoa/pessoa';

export class Pet {
    id: number;
    dsNome: string;
    dtNacimento: Date;
    raca: Raca;
    pessoa: Pessoa;
}
