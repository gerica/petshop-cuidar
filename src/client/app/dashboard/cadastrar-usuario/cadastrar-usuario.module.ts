import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';


import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';

@NgModule({
    imports: [SharedModule],
    declarations: [CadastrarUsuarioComponent],
    exports: [CadastrarUsuarioComponent]
})

export class CadastrarUsuarioModule { }
