import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
    transform(items: any[], terms: string, field: string, returnLength): any[] {
        if (!items) return [];
        if (!terms || !field) return items;
        terms = terms.toLowerCase();
        const filtered = items.filter(item => {
            return item[field].toLowerCase().includes(terms);
        });
        return returnLength ? filtered.length : filtered;
    }
}