import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {SelectItem} from "primeng/api";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.componet.scss']
})
export class LandingComponent {
    selectedCountry: any;
    items: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
    filteredItems: string[];
    selectedItem: string;

    ngOnInit() {
        this.cities = [
            { label: 'Umrah', value: 1 },
            { label: 'Rawda', value: 2 },
        ];

    }

    // countries: any[] = [];
    filteredCountries: any[] = [];

    searchItems(event) {
        this.filteredItems = this.items.filter(item => item.toLowerCase().includes(event.query.toLowerCase()));
    }
    selectedCountryAdvanced: any[] = [];
    selectedDrop: SelectItem = { value: '' };
    cities: SelectItem[] = [];
     countries = [
         {"name": "Umrah", "code": "Umrah"},
         {"name": "Rawda", "code": "Rawda"},

     ];

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;

    }


    constructor(public layoutService: LayoutService, public router: Router) { }

    next(stage) {

        console.log(this.selectedDrop);
    }
}
