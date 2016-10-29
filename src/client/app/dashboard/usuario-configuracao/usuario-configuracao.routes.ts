import { Route } from '@angular/router';
import { AuthGuard } from '../../common/auth.guard';
import { UsuarioConfiguracaoComponent } from './index';

export const UsuarioConfiguracaoRoutes: Route[] = [{
    path: 'usuario-configuracao',
    component: UsuarioConfiguracaoComponent,
    canActivate: [AuthGuard]
}, ];
