import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { Lembrete } from './../../../shared/entity/relacionamento/lembrete';
import { LembreteService } from './../../../shared/service/relacionamento/lembrete.service';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { TipoPetService } from './../../../shared/service/pet/tipo-pet.service';
import { TipoPet } from './../../../shared/entity/pet/tipoPet';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';

@Component({
    moduleId: module.id,
    selector: 'manter-lembrete',
    templateUrl: './manter-lembrete.component.html',
    providers: [TipoPetService, LembreteService]
})

export class ManterLembreteComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    lembrete: Lembrete;
    cliente: Pessoa;
    addLembrete: number = 0;
    @ViewChild('modalExcluir') public modalExcluir: ModalDirective;
    lembreteExcluir: Lembrete;
    dtLembrarEm: string;

    /**
     * Construtor
     */
    constructor(private tipoPetService: TipoPetService,
        private lembreteService: LembreteService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.lembrete = new Lembrete();
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.lembrete = new Lembrete();
    }

    public onNotifyAlerta(message: any): void {
        this.alertaUtil.addMessage(message);
    }

    public onNotifyLembrete(lembrete: Lembrete): void {
        this.lembrete = lembrete;
    }

    /**
     * Grava
     */
    public gravar(event: any): void {
        event.preventDefault();
        this.lembreteService.gravar(this.lembrete, this.cliente.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
                this.addLembrete++;
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });

    }

    public excluir(event: any): void {
        event.preventDefault();
        this.lembreteService.excluir(this.lembreteExcluir.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
                this.addLembrete++;
                this.modalExcluir.hide();
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
        this.modalExcluir.hide();
    }

    public showModalExcluir(): void {
        this.lembreteExcluir = this.lembrete;
        this.modalExcluir.show();
    }

    public onSelectedCliene(cliente: Pessoa): void {
        this.cliente = cliente;
        console.log('Cliente: ', this.cliente);
    }

}
