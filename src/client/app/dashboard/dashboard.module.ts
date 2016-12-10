import { VenderProdutoModule } from './vender-produto/vender-produto.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { HomeModule } from './home/home.module';
import { BlankPageModule } from './blank-page/blankPage.module';
import { DashboardComponent } from './dashboard.component';
import { TopNavComponent } from '../shared/index';
import { SidebarComponent } from '../shared/index';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from '../common/auth.guard';
import { CadastrarUsuarioModule } from './cadastrar-usuario/cadastrar-usuario.module';
import { CadastrarClienteModule } from './cadastrar-cliente/cadastrar-cliente.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DropdownModule,
        ModalModule,
        HomeModule,
        BlankPageModule,
        CadastrarUsuarioModule,
        CadastrarClienteModule,
        VenderProdutoModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent],
    providers: [AuthGuard, ...AUTH_PROVIDERS]
})

export class DashboardModule { }
