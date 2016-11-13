# Sistama de controle de operação em ações

Utilizando o tamplate: **SB Admin rewritten in Angular2 and Bootstrap 4**

## Funcionalidades

- Configurar qual ação será atualizada.
- Configurar o stop loss e stop gain.
- Apresntar como esta a carteira de investimentos.
- Realizar operação de entrada e saída.
- Relatório de acompanhamento.

# Tarefas 
## A FAZER
- Usuário

- Operação	
	
	+ Funcionalidade de apresentar o saldo das operações individuais.		
	+ Relatório se a saída do papel obedeceu as metas.

- Home

	Adicionra gráfico para acompanhar a carteira.

- Cotação
	
	+ Funcionalidade de atualizar a cotação com a BOVESPA, automaticamente.

- Configuração

	+ Adicionar barra de progresso nas telas.

- Dashboard
	

- Refectory

	+ Alterar a forma que é atualizada as cotações.

7	
## REALIZADA
- Usuário

	+   Criar funcionalidade de registrar usuário.
	+	Funcionalidade de verificar a duplicidade.
	+	Alterar a forma que é feita a autenticação, para utilizar o email, e retornar o usuário.
	+	Criar funcionalidade de ROLES.
	+	Validar email
	+	Validar quantidade de letras para a senha.
	+	Funcionalidade para poder alterar nome e senha.
	+   Funcionalidade de apresentar todas as operações abertas e os totais.

- Configuração

	+ Funcionalidade de selecionar quais papeis serão utilizado pelo sistema, isto é quais papeis serão atualizados,cotação atualizada, automaticamente pela BOVESTA.
	+ Funcionalidade de filtar por nome do papel.
	+ Funcionalidade de informar qual será a meta de saída. STOP GAIN e STOP LOST

- Cotação

	+ Funcionalidade de atualizar a cotação com a BOVESPA, manualmente.
	+ Adicionar chart para acompanhar rentabilidade.

- Operação

	+ Funcionalidade de operação de entrada CRUD.
	+ Funcionalidade de operação de saída.
	+ Funcionalidade de apresentar o saldo das operações fechadas. 
	+ Funcionalidade de excluir somente poderá ser realizada se não houver nenhuma operação de saída.
	+ Funcionalidade de apresentar o saldo das operações abertas.
	* Adicionar saldo na tela de home.
	+ Funcionalidade de apresentar o saldo das operações consolidadas.
	+ Funcionalidade de relatório de ganhos/percas por período.

- Refectory

	+ Adicionar componentes para as tabs da funcionalidade de operações.
	+ Na tela de operações, aba de operações fechadas, adicionar funcionalidade de abrir e fechar um item da tabela.
	+ A data esta sendo convertida para string e com isso ficando incorreta.
	+ Alterar a tabela da página home para adicionar o saldo. 
	+ Refatorando os serviços para adicionar métodos padrão de tratamento de retorno.

- Dashboard

	+ Adicionar tabela com informações de operações.
	