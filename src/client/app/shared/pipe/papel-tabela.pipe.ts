import { Pipe, PipeTransform } from '@angular/core';
import { Papel } from '../../shared/entity/papel';

@Pipe({ name: 'papeisPipe' })
export class PapelTabelaPipe implements PipeTransform {

    transform(array: Array < Papel > , query: string) {
        if (query === undefined) {
            return array;
        } else if (array) {
            return array.filter((item: any) => {
                for (let key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                        (item[key].toUpperCase().indexOf(query.toUpperCase()) !== -1)) {
                        return true;
                    }
                }
                return false;
            });
        }
        return null;
    }

}
