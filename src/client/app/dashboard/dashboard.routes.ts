import { Route } from '@angular/router';
import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { DashboardComponent } from './index';
import { CadastrarUsuarioRoutes } from './cadastrar-usuario/index';
import { CadastrarClienteRoutes } from './cadastrar-cliente/cadastrar-cliente.routes';

export const DashboardRoutes: Route[] = [{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        ...HomeRoutes,
        ...BlankPageRoutes,
        ...CadastrarUsuarioRoutes,
        ...CadastrarClienteRoutes,
    ]
}];
