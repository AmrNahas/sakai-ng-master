import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {SelectItem} from "primeng/api";
import {JourneyDto} from "./journeyDto";
import {PlaningStepsInfo} from "./planingStepsInfo";
import {JourneyPlannerSrvcService} from "./journeyPlannerSrvc.service";
import {b} from "@fullcalendar/core/internal-common";

@Component({
    selector: 'app-journy',
    templateUrl: './journy.component.html',
    styleUrls: ['./journy.componet.scss']
})
export class JournyComponent {
    selectedCountry: any;
    items: string[] = ['Umrah', 'Rawda'];
    filteredItems: string[];
    selectedItem: string;
    journeyDto: JourneyDto = new JourneyDto();
    planingStepsInfo: PlaningStepsInfo[] = [];

    ngOnInit() {
        this.step =2
        this.autoCompeletDone=true;
    }

    // countries: any[] = [];
    filteredCountries: any[] = [];

    searchItems(event) {
        this.filteredItems = this.items.filter(item => item.toLowerCase().includes(event.query.toLowerCase()));
    }

    selectedCountryAdvanced: any[] = [];
    selectedDrop: SelectItem = {value: ''};
    input1: any;
    step: number;
    autoCompeletDone: boolean;
    date: any;
    date2: any;


    constructor(public layoutService: LayoutService, public router: Router, public service: JourneyPlannerSrvcService) {
    }

    next(stage) {
        var planningStep: PlaningStepsInfo = new PlaningStepsInfo()
        planningStep.stepNum = this.step;
        planningStep.stepInput = this.input1;
        planningStep.stepResult = "thanks ndsid iajdisdfis";
        this.planingStepsInfo.push(planningStep)
        console.log(this.planingStepsInfo);
        this.step = stage + 1
        this.input1 = "";
    }



    getPLanerQuestions() {
        if(this.input1==null || this.input1=='' )
            return;
        this.autoCompeletDone=false;
        setTimeout(() => {
            this.input1 = this.service.autoCompleteNusukService(this.input1)
            this.autoCompeletDone=true;
        }, 500);

    }
}
