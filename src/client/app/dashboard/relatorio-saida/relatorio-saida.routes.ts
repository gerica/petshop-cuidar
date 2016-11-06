import { Route } from '@angular/router';
import { AuthGuard } from '../../common/auth.guard';
import { RelatorioSaidaComponent } from './index';

export const RelatorioSaidaRoutes: Route[] = [{
    path: 'relatorio-saida',
    component: RelatorioSaidaComponent,
    canActivate: [AuthGuard]
}, ];
