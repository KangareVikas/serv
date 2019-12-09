import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], terms: string, fieldOrFields: any): any[] {
        if (!items) return [];
        if (!terms || !fieldOrFields) return items;
        terms = terms.toLowerCase();
        return items.filter(item => {
            let fieldToUse;
            if (Array.isArray(fieldOrFields)) {
                for (let field of fieldOrFields) {
                    if (item.hasOwnProperty(field)) {
                        fieldToUse = field;
                        break;
                    }
                }
            } else {
                fieldToUse = fieldOrFields;
            }
            return item.hasOwnProperty[fieldToUse] && item[fieldToUse].toLowerCase().includes(terms);
        });
    }
}