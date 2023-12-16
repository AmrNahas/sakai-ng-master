import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {GbtMsgResp} from "./gbtMsgResp";


@Injectable({
    providedIn: 'root'
})
export class GbtService {

    mainHost: string = 'http://192.168.0.7:55050';
    response: any = {};

      headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', 'http://localhost:4200')
          .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    constructor(private http: HttpClient) {
    }


    public sendMsg(msg: string, threadId: string): Observable<GbtMsgResp> {
        return this.http.post<any>(this.mainHost + "/api/ChatGpt/CallAI", {"userMsg": msg, "threadId": threadId},{});

    }


}
