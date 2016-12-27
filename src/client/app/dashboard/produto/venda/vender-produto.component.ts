import { ItemVenda } from './../../../shared/entity/produto/item-venda';
import { ProdutoService } from './../../../shared/service/produto/produto.service';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'form-vender-produto',
    templateUrl: './vender-produto.component.html',
    providers: [ProdutoService]
})

export class VenderProdutoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    clienteControl: FormControl = new FormControl();
    vendaForm: FormGroup = new FormGroup({
        clienteControl: this.clienteControl
    });
    cliente: Pessoa;
    itensVenda: ItemVenda[];

    /**
     * Construtor
     */
    constructor(private produtoService: ProdutoService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.itensVenda = [];
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.itensVenda = [];
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

    public onSelectedCliene(cliente: Pessoa): void {
        this.cliente = cliente;
        // console.log('Cliente: ', this.cliente);
    }

    public onSelectedProduto(produto: any): void {
        // console.log('Produto: ', produto);
        this.recuperarLotePorIdProduto(produto);

        // this.itensVenda.push(produto);
        // this.onSelectedProduto = null;
    }

    public recuperarLotePorIdProduto(produto: any): void {
        this.produtoService.recuperarLotePorIdProduto(produto.id, produto.tipoProduto)
            .subscribe(
            data => {
                this.createItemVenda(produto, data.objeto);

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

    public createItemVenda(produto: any, lote: any[]): void {
        let itemVenda: ItemVenda = new ItemVenda();
        //dados do produto
        itemVenda.id = produto.id;
        itemVenda.marca = produto.marca;
        itemVenda.nome = produto.nome;
        itemVenda.tipoProduto = produto.tipoProduto;

        // dados do lote
        if (lote.length > 0) {
            itemVenda.numero = lote[0].numero;
            itemVenda.dataLote = lote[0].dataLote;
            itemVenda.dataValidade = lote[0].dataValidade
            itemVenda.valor = lote[0].valor;
            itemVenda.valorVenda = lote[0].valorVenda;
            itemVenda.quantidade = lote[0].quantidade;
        }
        itemVenda.quantidadeVenda = 1;
        this.itensVenda.push(itemVenda);
    }

    public removerItem(index: number): void {
        this.itensVenda.splice(index, 1);
    }

    public adicionarItemVenda(index: number): void {
        this.itensVenda[index].quantidadeVenda++;
    }
    public subtrairItemVenda(index: number): void {
        if (this.itensVenda[index].quantidadeVenda > 0) {
            this.itensVenda[index].quantidadeVenda--;
        }

    }

    public showHideColuna(item: ItemVenda): void {
        item.showDetalhe = !item.showDetalhe;
    }

}
