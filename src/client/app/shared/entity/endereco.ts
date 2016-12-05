import { Cidade } from './cidade';
export class Endereco {
    id: number;
    cep: string;
    logradouro: string;
    numero: number;
    complemento: number;
    bairro: number;
    cidade: Cidade;
}
