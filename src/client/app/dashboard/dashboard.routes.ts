import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { OperacaoInvestimentoRoutes } from './operacao-investimento/index';
import { UsuarioConfiguracaoRoutes } from './usuario-configuracao/index';
import { RelatorioSaidaRoutes } from './relatorio-saida/index';


import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            ...HomeRoutes,
            ...BlankPageRoutes,
            ...OperacaoInvestimentoRoutes,
            ...UsuarioConfiguracaoRoutes,
            ...RelatorioSaidaRoutes
        ]
    }
];
