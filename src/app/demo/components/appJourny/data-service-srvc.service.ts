import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {PlaningResult} from "./planingResult";

@Injectable()
export class DataServiceSrvc {
    private messageSource = new BehaviorSubject<PlaningResult>(null);
    currentMessage = this.messageSource.asObservable();

    constructor() { }



    changeMessage(r: PlaningResult) {
        this.messageSource.next(r)
    }

}
