import { PessoaService } from './../../shared/service/pessoa/pessoa.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from './../../shared/service/utils.service';
import { Pessoa } from './../../shared/entity/pessoa/pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

@Component({
    moduleId: module.id,
    selector: 'form-vender-produto',
    templateUrl: './vender-produto.component.html',
    providers: [UtilsService, PessoaService]
})

export class VenderProdutoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    clientes: Pessoa[];
    clienteControl: FormControl = new FormControl();
    vendaForm: FormGroup = new FormGroup({
        clienteControl: this.clienteControl
    })
    asyncSelected: string = '';
    dataSource: Observable<any>;
    typeaheadLoading: boolean = false;
    typeaheadNoResults: boolean = false;

    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService,
        private pessoaService: PessoaService) {
        this.dataSource = Observable.create((observer: any) => {
            this.pessoaService.recuperarPessoaPorNome(this.asyncSelected)
                .subscribe(
                data => {
                    this.clientes = data.objeto;
                    observer.next();
                },
                error => {
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: error.message === undefined ? error : error.message
                    });
                }
                );
            // observer.next(this.asyncSelected);
        }).mergeMap(() => this.getStatesAsObservable());

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {

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
        //         });ReactiveFormsModule
        //     });
    }


    public getStatesAsObservable(): Observable<any> {
        return Observable.of(this.clientes);
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e: any): void {
        console.log('Selected value: ', e);
    }

}
