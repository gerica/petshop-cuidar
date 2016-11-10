import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    AlertModule,
    TabsModule,
    ModalModule,
    ProgressbarModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { UsuarioConfiguracaoComponent } from './usuario-configuracao.component';
import { PapelTabelaPipe } from '../../shared/pipe/papel-tabela.pipe';

@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AlertModule,
        TabsModule,
        ModalModule,
        ProgressbarModule
    ],
    declarations: [UsuarioConfiguracaoComponent, PapelTabelaPipe],
    exports: [UsuarioConfiguracaoComponent]
})

export class UsuarioConfiguracaoModule { }
