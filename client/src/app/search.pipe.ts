import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
    transform(items: any[], terms: string, field: string): any[] {
        if (!items) return [];
        if (!terms || !field) return items;
        terms = terms.toLowerCase();
        return items.filter(item => {
            return item[field].toLowerCase().includes(terms);
        });
    }
}