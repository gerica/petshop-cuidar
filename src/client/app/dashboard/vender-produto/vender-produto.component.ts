import { UtilsService } from './../../shared/service/utils.service';
import { Pessoa } from './../../shared/entity/pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-vender-produto',
    templateUrl: './vender-produto.component.html',
    providers: [UtilsService],
    styles: [`
    	.tooltip.customClass .tooltip-inner {
    		color: #880000;
    		background-color: #ffff66;
    		box-shadow: 0 6px 12px rgba(0,0,0,.175);
    	}
    	.tooltip.customClass .tooltip-arrow {
    		display: none;
    	}
    `]
})

export class VenderProdutoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;

    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.recuperarEstados();

    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
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
        // this.utilsService.recuperarEstados()
        //     .subscribe(
        //     data => {
        //         this.estados = data.objeto;
        //     },
        //     error => {
        //         this.alertaUtil.addMessage({
        //             type: 'danger',
        //             closable: true,
        //             msg: error.message === undefined ? error : error.message
        //         });
        //     }
        //     );

    }

    public typeaheadOnSelect(e: any): void {

    }

}
