import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], terms: string, fieldsCommaSeperatedList: string): any[] {
        if (!items) return [];
        if (!terms || !fieldOrFields) return items;
        terms = terms.toLowerCase();
        let arrFields = fieldsCommaSeperatedList.split(',');
        return items.filter(item => {
            let fieldToUse = null;
            for (let field of arrFields) {
                if (item[field]) {
                    fieldToUse = field;
                    break;
                }
            }
            return fieldToUse && item[fieldToUse] && item[fieldToUse].toLowerCase().includes(terms);
        });
    }
}