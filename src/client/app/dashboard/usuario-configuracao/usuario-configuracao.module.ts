import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    AlertModule,
    TabsModule,
    ModalModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { UsuarioConfiguracaoComponent } from './usuario-configuracao.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AlertModule,
        TabsModule,
        ModalModule
    ],
    declarations: [UsuarioConfiguracaoComponent],
    exports: [UsuarioConfiguracaoComponent]
})

export class UsuarioConfiguracaoModule {}
