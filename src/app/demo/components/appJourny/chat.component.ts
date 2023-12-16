import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {JourneyPlannerSrvcService} from "./journeyPlannerSrvc.service";
import {DataServiceSrvc} from "./data-service-srvc.service";
import {MessagesDto} from "./messagesDto";
import {GbtService} from "./gbt.service";
import {GbtMsgResp} from "./gbtMsgResp";
import {AuthServiceService} from "../auth/login/authService.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.componet.scss']
})
export class ChatComponent {

    threadId: string = '';

    messageFrom: any;
    messgesList: Array<MessagesDto>;

    constructor(public authSrvc: AuthServiceService, public layoutService: LayoutService, public router: Router, public service: JourneyPlannerSrvcService, private data: DataServiceSrvc,
                public gbtService: GbtService) {

    }

    userInfo: any;


    logOut() {
        this.authSrvc.logout();
        this.router.navigate(['/auth/login']);
    }


    ngOnInit() {

        this.userInfo = this.authSrvc.getUserInfo();
        this.messgesList = []
        if (this.userInfo)
            this.allowedToSend = true;
         this.srcInit =
             "https://d-id-talks-prod.s3.us-west-2.amazonaws.com/auth0%7C657d5fd688c5a1a2857188bf/tlk_LBCWOh6TJBVsmCj-tOEPI/1702715807499.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1702802210&Signature=vujThtGCSKFZ0ikqV%2BDIhvE5NK8%3D&X-Amzn-Trace-Id=Root%3D1-657d61a2-0871c1b07aa606f9602cf8b4%3BParent%3Dd9e445403c2c8e39%3BSampled%3D1%3BLineage%3D6b931dd4%3A0";
       // this.getVideoInit  ("Welcome "+this.userInfo.fullName+" To Nusuk Ai Advisor , How Can  I  Help You  For Your Nusuk Journy ")

    }

    getVideoInit(msg) {
        console.log("knjkhn")
        this.gbtService.textToVideo(msg, null).subscribe({
            next: (res: any) => {
                if (res) {
                    console.log(res)
                    this.srcInit = res.text;
                }
            },
            error: (err) => {
                console.log(err);
            },
        });

    }

    @ViewChild('scrollableDiv', {static: true}) myDiv: ElementRef;

    scrollToBottom() {
        const divElement = this.myDiv.nativeElement;
        divElement.scrollTop = divElement.scrollHeight;
    }

    allowedToSend: boolean
    audio: string;
    msgDto: MessagesDto = new MessagesDto();
    srcInit: string;


    send() {
        this.allowedToSend = false;
        this.scrollToBottom()
        this.msgDto = new MessagesDto();
        this.msgDto.msgFrom = this.messageFrom;
        this.msgDto.appAdvisorName = "Nusuk Advisor AI"
        this.msgDto.userName = this.userInfo.fullName
        this.messgesList.push(this.msgDto);
        this.messageFrom = "";
        this.gbtService.sendMsg(this.msgDto.msgFrom, this.threadId).subscribe({
            next: (res: GbtMsgResp) => {
                if (res && res.chatResponse) {
                    this.threadId = res.threadId;
                    this.msgDto.msgTo = res.chatResponse;
                    this.allowedToSend = true;
                    this.textToAudio(this.msgDto.msgTo)
                    this.getVideo(this.msgDto.msgTo);

                }
            },
            error: (err) => {
                this.allowedToSend = true;
                console.log(err);
            },
        });


        localStorage.setItem("my chat", JSON.stringify(this.messgesList));
        /*        setTimeout(() => {
                    msgDto.msgTo="fghjkjhgfghjk sfsssf  sfsfsfsfsfsfsf sfsdfsfsff"
                }, 1000);*/
    }

    textToAudio(msg) {
        this.audio = null;
        this.gbtService.textToAudio(msg, this.threadId).subscribe({
            next: (res: string) => {
                if (res) {
                    this.msgDto.audioMsg = "data:audio/ogg;base64," + res;
                }
            },
            error: (err) => {
                this.allowedToSend = true;
                console.log(err);
            },
        });
    }


    getVideo(msg) {
        this.gbtService.textToVideo(msg, null).subscribe({
            next: (res: any) => {
                if (res) {
                    this.msgDto.videoSrc = res.text;
                }
            },
            error: (err) => {
                console.log(err);
            },
        });

    }

    saveChatKey() {

    }

    goToReservations() {
        console.log("sgdfv")
    }

}
