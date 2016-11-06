import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    AlertModule,
    TabsModule,
    ModalModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { RelatorioSaidaComponent } from './relatorio-saida.component';


@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AlertModule,
        TabsModule,
        ModalModule
    ],
    declarations: [RelatorioSaidaComponent],
    exports: [RelatorioSaidaComponent]
})

export class RelatorioSaidaModule { }
