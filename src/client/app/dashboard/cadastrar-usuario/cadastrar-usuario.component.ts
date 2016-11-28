import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { Usuario } from '../../shared/entity/usuario';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-usuario.component.html',
    providers: []
})

export class CadastrarUsuarioComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();


    /*Construtor*/
    constructor() {

    }

    /*Métodos*/
    public ngOnInit(): void {

    }

    // public recuperarTodosPapeis(): void {
    //     this.papelService.recuperarTodosPapeis()
    //         .subscribe(
    //             data => {
    //                 this.papeis = data;
    //                 console.log('Sucesso recuperarTodosPapeis().');
    //             },
    //             error => {
    //                 this.alertaUtil.addMessage({
    //                     type: 'danger',
    //                     closable: true,
    //                     msg: error
    //                 });
    //             }
    //         );
    // }

    // public ativarDesativarPapel(papel: Papel): void {
    //         this.papelService.ativarDesativarPapel(papel)
    //             .subscribe(
    //                 result => {
    //                     // this.recuperarTodosPapeis();
    //                     papel.ativo = !papel.ativo;
    //                     this.alertaUtil.addMessage({
    //                         type: 'success',
    //                         closable: true,
    //                         msg: result.message
    //                     });
    //                     console.log('Sucesso ativarDesativarPapel().' + papel.papel);
    //                 },
    //                 error => {
    //                     this.alertaUtil.addMessage({
    //                         type: 'danger',
    //                         closable: true,
    //                         msg: error.message
    //                     });
    //                 }
    //             );
    //     }

}
