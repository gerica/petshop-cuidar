const PAPEIS: Papel[] = [
	{id: 1, nome: "HERING", papel: "HGTX3", setor: 1, rank: 4},
	{id: 2, nome: "AMBEV", papel: "ABEV3", setor: 1, rank: 4}
];

const OPERACOES: Operacao[] = [
	{data: new Date(), tipoOperacao: "Comprar", precoUnitario: 15.6,	quantidade: 100, despesa: 10.9,	observacao: "verificar", papel: PAPEIS[0]},
	{data: new Date(), tipoOperacao: "Vender", precoUnitario: 13,	quantidade: 400, despesa: 18.9,	observacao: "verificar", papel: PAPEIS[1]}
];