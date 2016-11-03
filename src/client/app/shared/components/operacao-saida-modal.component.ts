import { Component, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChange, OnInit } from '@angular/core';
import { Operacao } from '../../shared/entity/operacao';
import { OperacaoSaida } from '../../shared/entity/operacao-saida';
import { OperacaoService } from '../../shared/service/operacao.service';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'modal-operacao-saida',
    templateUrl: './operacao-saida-modal.component.html',
    providers: [OperacaoService]
})

export class OperacaoSaidaModalComponent implements OnInit, OnChanges {
    @ViewChild('modalOperacaoSaida') public modalOperacaoSaida: ModalDirective;
    @Input() notifyAbriModal: Operacao;
    @Output() notifyFecharModal: EventEmitter < any > = new EventEmitter < any > ();
    activeOperacaoSaidaForm = true;
    operacaoSaida: OperacaoSaida;

    /*Construtor*/
    constructor(private operacaoService: OperacaoService) {}

    /*Métodos*/
    public ngOnInit(): void {}
        /**
         * Método que é chamado toda vez que o objeto com @Input sofrer alguma alteração.
         * Nesse caso o objeto é: notifyAbriModal
         */
    public ngOnChanges(changes: {
        [propKey: string]: SimpleChange
    }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            let from = changedProp.previousValue;
            let to = changedProp.currentValue;
            console.log('from: ' + from + '; to: ' + to);
            if (to !== undefined && to instanceof Object) {
                this.showModalOperacaoSaida(to);
                break;
            }

        };
    }

    public notifyFecharModaltEmit(message: any) {
        this.notifyFecharModal.emit(message);
    }
    public gravarOperacaoSaida(event: any): void {
        event.preventDefault();
        this.operacaoService.gravarOperacaoSaida(this.operacaoSaida)
            .subscribe(
                result => {
                    this.novaOperacaoSaida();
                    this.modalOperacaoSaida.hide();
                    this.notifyFecharModaltEmit({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                },
                err => {
                    // Log errors if any
                    this.notifyFecharModaltEmit({
                        type: 'danger',
                        closable: true,
                        msg: err.message
                    });
                });
    }
    public novaOperacaoSaida() {
        this.activeOperacaoSaidaForm = false;
        setTimeout(() => this.activeOperacaoSaidaForm = true, 0);
    }
    public showModalOperacaoSaida(operacao: Operacao): void {

        this.operacaoSaida = new OperacaoSaida();
        this.operacaoSaida.operacaoEntrada = operacao;
        this.operacaoSaida.operacaoEntrada.papel = operacao.papel;
        this.operacaoSaida.quantidade = operacao.quantidade;
        if ('Comprar' === operacao.tipoOperacao) {
            this.operacaoSaida.tipoOperacao = 'Vender';
        } else {
            this.operacaoSaida.tipoOperacao = 'Comprar';
        }

        this.modalOperacaoSaida.show();
    }
    public hideModalOperacaoSaida(): void {
        this.modalOperacaoSaida.hide();
        this.notifyFecharModaltEmit({
            type: 'close',
            closable: true,
            msg: ''
        });

    }
}
