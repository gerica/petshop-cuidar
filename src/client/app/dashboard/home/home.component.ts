import { Component } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';

/**
 *    This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: []
})

export class HomeComponent {
    alertaUtil: AlertaUtil = new AlertaUtil();

}
