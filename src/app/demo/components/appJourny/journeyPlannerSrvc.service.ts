import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class JourneyPlannerSrvcService {

    constructor(private http: HttpClient) {
    }

    getPLanerQuestions() {
        return this.http.get<any>('assets/demo/data/planerQuestionsData.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    autoCompleteNusukService(input: string):string {
        if (input.toLowerCase().startsWith("u") || input.toLowerCase().startsWith("um") || input.toLowerCase().startsWith("umr") || input.toLowerCase().startsWith("umra") || input.toLowerCase().startsWith("umrah"))
            return "Umrah Service"

        else if (input.toLowerCase().startsWith("r") || input.toLowerCase().startsWith("ra") || input.toLowerCase().startsWith("raw") || input.toLowerCase().startsWith("rawd") || input.toLowerCase().startsWith("rawda"))
            return "Rawda Service"
        else return input;
    }
}
