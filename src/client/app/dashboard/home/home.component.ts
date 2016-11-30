import { Component, OnInit } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ActivatedRoute } from '@angular/router';

/**
 *    This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: []
})

export class HomeComponent implements OnInit {
    alertaUtil: AlertaUtil = new AlertaUtil();
    private sub: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: params['desc']
                });

            // In a real app: dispatch action to load the details here.
        });
    }
}
