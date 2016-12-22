import { Racao } from './../../../shared/entity/produto/racao';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorRacao'
})

export class FiltroPorRacao implements PipeTransform {

    transform(racoes: Racao[], digitado: string) {
        if (!racoes) {
            return racoes;
        }

        return racoes.filter((item: any) => {
            for (let key in item) {
                if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                    (item[key].toUpperCase().indexOf(digitado.toUpperCase()) !== -1)) {
                    return true;
                }
            }
            return false;
        });
    }

}
