import { Component } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
    selector: 'screen-tickets-mytickets_phoneportrait',
    templateUrl: 'mytickets.html'
})
export class tickets_mytickets_PhonePortrait extends Screen {
    data: any;

    ngOnInit(): void {
        super.ngOnInit();
        // Logic to run when the screen loads goes here.

        this.data.sortOptions = {
            "options": [
                {
                    "label": "Date",
                    "value": "CreatedDateTime"
                },
                {
                    "value": "IncidentID",
                    "label": "Ticket ID"
                }
            ],
            "selected": "CreatedDateTime"
        };
        this.data.descending = true;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // Logic to run when the screen unloads goes here.
    }

    onDataLoad(data: any): void {
        // Logic to run when the screen's data is updated goes here.
    }
    onBackButton(): boolean {
        //(Android) returns :
        // true - handle the event in App Hooks
        // false - stop the event propogation
        return true;
    }

    parseItem(sortField) {
        if (sortField === "rowIndex" || sortField === "price") {
            return (item) => parseInt(item);
        } else {
            return (item) => item;
        }
    }

    sortBy(sortField, lessThan, greaterThan) {
        let parseItem = this.parseItem(sortField);
        this.data.items.sort((a, b) => {
            return parseItem(a[sortField]) < parseItem(b[sortField]) ? lessThan : greaterThan;
        })
    }

    handleSort() {
        let lessThan = -1;
        let greaterThan = 1
        if (this.data.descending) {
            lessThan = 1;
            greaterThan = -1
        }

        this.sortBy(this.data.filter.selected, lessThan, greaterThan);
    }
}
