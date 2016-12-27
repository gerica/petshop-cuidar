export class ItemVenda {
    //Dados Produto
    id: number;
    marca: string;
    nome: string;
    tipoProduto: string;

    // Dados Lote
    numero: number;
    dataLote: Date;
    dataValidade: Date;
    valor: number;
    valorVenda: number;
    quantidade: number;

    //Dados Venda
    quantidadeVenda: number;
    dataVenda: Date;

    //Dados para tela
    showDetalhe: boolean = false;
}
