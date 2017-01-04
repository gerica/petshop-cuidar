import { Router } from '@angular/router';
import { Orcamento } from './../../../shared/entity/venda/orcamento';
import { OrcamentoService } from './../../../shared/service/venda/orcamento.service';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'listar-orcamento',
    templateUrl: './listar-orcamento.component.html',
    providers: [OrcamentoService]
})

export class ListarOrcamentoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    orcamentos: Orcamento[];
    orcamentoView: Orcamento;

    /**
     * Construtor
     */
    constructor(private orcamentoService: OrcamentoService,
        private router: Router) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.orcamentos = [];
        this.recuperarTodos();
    }

    public recuperarTodos(): void {
        this.orcamentoService.recuperarTodos()
            .subscribe(
            data => {
                this.orcamentos = data.objeto;
                this.calcularValorOrcamento();
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            }
            );
    }

    public calcularValorOrcamento(): void {
        if (this.orcamentos) {
            this.orcamentos.forEach(e => {
                e.itens.forEach(i => {
                    if (!e.valorOrcamento) {
                        e.valorOrcamento = 0;
                    }

                    e.valorOrcamento += i.valorVenda;
                    e.valorDesconto = i.desconto;
                    i.temLote = i.quantidade > 0;
                });
                e.valorOrcamentoSemDesconto = e.valorOrcamento;
                if (e.valorDesconto > 0) {
                    e.valorOrcamento = e.valorOrcamento - ((e.valorDesconto / 100) * e.valorOrcamento)
                }
            });
        }
    }

    public visualizar(orcamento: Orcamento): void {
        this.orcamentoView = orcamento;
    }

    public getPaginaEditar(orcamento: Orcamento): void {
        this.router.navigate(['/dashboard/vender-produto', orcamento.id]);

    }

    public fechar(orcamento: Orcamento): void {
        this.router.navigate(['/dashboard/vender-produto', orcamento.id]);
    }

}
