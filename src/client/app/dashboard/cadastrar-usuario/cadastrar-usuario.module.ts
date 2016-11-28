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

import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AlertModule,
        TabsModule,
        ModalModule,
        ProgressbarModule
    ],
    declarations: [CadastrarUsuarioComponent],
    exports: [CadastrarUsuarioComponent]
})

export class CadastrarUsuarioModule {}
