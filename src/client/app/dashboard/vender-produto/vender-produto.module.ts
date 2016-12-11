import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    AlertModule,
    TabsModule,
    ModalModule,
    TooltipModule,
    TypeaheadModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { VenderProdutoComponent } from './vender-produto.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlertModule,
        TabsModule,
        ModalModule,
        TypeaheadModule,
        TooltipModule
    ],
    declarations: [VenderProdutoComponent],
    exports: [VenderProdutoComponent]
})

export class VenderProdutoModule { }
