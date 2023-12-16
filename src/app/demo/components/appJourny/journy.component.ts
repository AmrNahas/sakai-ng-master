import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {SelectItem} from "primeng/api";
import {JourneyDto} from "./journeyDto";
import {PlaningStepsInfo} from "./planingStepsInfo";
import {JourneyPlannerSrvcService} from "./journeyPlannerSrvc.service";
import {b} from "@fullcalendar/core/internal-common";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {PlaningResult} from "./planingResult";
import {DataServiceSrvc} from "./data-service-srvc.service";

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

    finished: boolean;
    srvcType: number;
    comingWith: number;
    constructor(public layoutService: LayoutService, public router: Router, public service: JourneyPlannerSrvcService,private data: DataServiceSrvc) {

    }
    ngOnInit() {

        this.step = 1
        this.autoCompeletDone = true;
        this.finished=false;


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
    loading: any;

    subscription: Subscription;
    serviceName: any;

     getServiceName(){
    if(this.srvcType)
        return this.srvcType==1?'To Performing Umrah':'To visiting Rawda '
         else return "";
     }

    goWith(){
        if(this.comingWith &&  this.comingWith!=1)
            return this.comingWith==2?'With your friends':'With your Family'
        else return "";
    }

    nextChat(stage) {
        var planningStep: PlaningStepsInfo = new PlaningStepsInfo()
        planningStep.stepNum = this.step;
        planningStep.stepInput = this.input1;
        planningStep.stepResult = "thanks ndsid iajdisdfis";
        this.planingStepsInfo.push(planningStep)
        console.log(this.planingStepsInfo);
        this.step = stage + 1
        this.input1 = "";
    }


    next(stage) {
        this.step = stage + 1
        if (stage == 4) {
            this.finished = true;
            setTimeout(() => {
                this.finished = false;
                this.data.changeMessage(new PlaningResult("",this.getServiceName(),this.goWith()))
               this.router.navigate(["/planner/result"]);
            }, 1000);

        }
    }

    getPLanerQuestions() {
        if (this.input1 == null || this.input1 == '')
            return;
        this.autoCompeletDone = false;
        setTimeout(() => {
            this.input1 = this.service.autoCompleteNusukService(this.input1)
            this.autoCompeletDone = true;
        }, 500);

    }

    setServiceType(srvcType: number) {
        this.srvcType = srvcType;
        this.next(1)
    }

    setComingWith(comingWith: number) {
        this.comingWith = comingWith;
        this.loading=true
        this.next(3)

    }
}
