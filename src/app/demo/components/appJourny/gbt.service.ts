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
        return this.http.post<any>(this.mainHost + "/api/ChatGpt/CallAI", {"userMsg": msg, "threadId": threadId}, {});

    }

    public textToAudio(msg: string, threadId: string): Observable<string> {
        return this.http.post<any>(this.mainHost + "/api/ChatGpt/texttoaudio", {"text": msg,}, {});

    }

    public textToVideo(msg: string, threadId: string): Observable<any> {
        return this.http.post<any>(this.mainHost + "/api/ChatGpt/texttovedio", {"text": msg,}, {});

    }



    public audioToText(blob: any, threadId: string): Observable<string> {
        const formData = new FormData();
        formData.append('file', blob);
        console.log(blob)
        return this.http.post<any>(this.mainHost + "/api/ChatGpt/audiototext", formData, {});

    }

//: Observable<string>

    public audioToAudioGbt(blob: any, threadId: string): string {
        this.audioToText(blob, threadId).subscribe({
            next: (msg: string) => {
                if (msg) {
                    this.textToAudio(msg, threadId).subscribe({
                        next: (txt: string) => {
                            if (txt) {
                                return txt;
                            }
                            else return  null;
                        },
                        error: (err) => {
                            console.log(err);
                            return null;
                        },
                    });
                }
                else return null;
            },
            error: (err) => {
                console.log(err);
                return null;
            },
        });
return null;
    }

}
