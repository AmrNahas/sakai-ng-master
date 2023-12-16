import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {SelectItem} from "primeng/api";
import {JourneyDto} from "./journeyDto";
import {PlaningStepsInfo} from "./planingStepsInfo";
import {JourneyPlannerSrvcService} from "./journeyPlannerSrvc.service";
import {b} from "@fullcalendar/core/internal-common";
import {BehaviorSubject, Observable, Subject, Subscription, takeUntil} from "rxjs";
import {PlaningResult} from "./planingResult";
import {DataServiceSrvc} from "./data-service-srvc.service";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.componet.scss']
})
export class ResultComponent {

    private currentUserSubject: BehaviorSubject<PlaningResult>;
    subscription: Subscription;
    r:PlaningResult;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(public layoutService: LayoutService, public router: Router, public service: JourneyPlannerSrvcService,private data: DataServiceSrvc) {
        this.currentUserSubject = new BehaviorSubject<PlaningResult>(null);

    }

    ngOnInit() {
        this.subscription = this.data.currentMessage.subscribe(message => this.r = message)
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
