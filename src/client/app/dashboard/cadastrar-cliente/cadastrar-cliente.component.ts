import { Cidade } from './../../shared/entity/cidade';
import { UtilsService } from './../../shared/service/utils.service';
import { Estado } from './../../shared/entity/estado';
import { Pessoa } from './../../shared/entity/pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-cliente.component.html',
    providers: [UtilsService]
})

export class CadastrarClienteComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    pessoa: Pessoa;
    estados: Estado[];
    estado: Estado;
    selectedEstado: string;
    cidades: Cidade[];
    cidade: Cidade;
    selectedCidade: Cidade;
    oneAtATime: boolean = false;
    status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.pessoa = new Pessoa();
        this.recuperarEstados();

    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.pessoa = new Pessoa();
    }

    /**
     * Grava novo usuário
     */
    public gravar(event: any): void {
        event.preventDefault();

        // this.usuarioService.incluirUsuario(this.usuario, this.rolesSelected)
        //     .subscribe(
        //     result => {
        //         this.recuperarUsuariosAtivo();
        //         this.alertaUtil.addMessage({
        //             type: 'success',
        //             closable: true,
        //             msg: result.message
        //         });
        //         this.novo();
        //     },
        //     err => {
        //         // Log errors if any
        //         this.alertaUtil.addMessage({
        //             type: 'danger',
        //             closable: true,
        //             msg: err.message === undefined ? err : err.message
        //         });
        //     });
    }

    public recuperarEstados(): void {
        this.utilsService.recuperarEstados()
            .subscribe(
            data => {
                this.estados = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );

    }

    public recuperarCidadePorEstado(idEstado: number): void {
        this.utilsService.recuperarCidadePorEstado(idEstado)
            .subscribe(
            data => {
                this.cidades = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );

    }

    public typeaheadOnSelect(e: any): void {
        this.estado = e.item;
        this.recuperarCidadePorEstado(this.estado.id);
        this.selectedCidade = null;

    }

    public typeaheadOnSelectCidade(e: any): void {
        this.cidade = e.item;
        console.log('Estado selecionado: ', this.estado);
        console.log('Cidade selecionada: ', this.cidade);
    }

}
