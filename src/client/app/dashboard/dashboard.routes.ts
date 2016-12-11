import { ListarClienteRoutes } from './cliente/listar-cliente/listar-cliente.routes';
import { VenderProdutoRoutes } from './vender-produto/vender-produto.routes';
import { Route } from '@angular/router';
import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { DashboardComponent } from './index';
import { CadastrarUsuarioRoutes } from './cadastrar-usuario/index';
import { CadastrarClienteRoutes } from './cliente/cadastrar-cliente/cadastrar-cliente.routes';

export const DashboardRoutes: Route[] = [{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        ...HomeRoutes,
        ...BlankPageRoutes,
        ...CadastrarUsuarioRoutes,
        ...CadastrarClienteRoutes,
        ...VenderProdutoRoutes,
        ...ListarClienteRoutes
    ]
}];
