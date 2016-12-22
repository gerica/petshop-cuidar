import { RacaoLote } from './../../../shared/entity/produto/racao-lote';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorRacaoLote'
})

export class FiltroPorRacaoLote implements PipeTransform {

    transform(racaoLotes: RacaoLote[], digitado: string) {        
        if (!racaoLotes || !digitado) {
            return racaoLotes;
        }

        return racaoLotes.filter((item: any) => {
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

