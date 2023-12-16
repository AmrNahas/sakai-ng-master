import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {JourneyPlannerSrvcService} from "./journeyPlannerSrvc.service";
import {DataServiceSrvc} from "./data-service-srvc.service";
import {MessagesDto} from "./messagesDto";
import {GbtService} from "./gbt.service";
import { GbtMsgResp} from "./gbtMsgResp";
import {AuthServiceService} from "../auth/login/authService.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.componet.scss']
})
export class ChatComponent {

    threadId: string='';

    messageFrom: any;
    messgesList: Array<MessagesDto>;

    constructor(public authSrvc: AuthServiceService ,public layoutService: LayoutService, public router: Router, public service: JourneyPlannerSrvcService, private data: DataServiceSrvc,public gbtService:GbtService) {

    }

    userInfo: any;


    logOut() {
        this.authSrvc.logout();
        this.router.navigate(['/auth/login']);
    }


    ngOnInit() {

        this.userInfo = this.authSrvc.getUserInfo();
        this.messgesList = []
        if(this.userInfo)
        this.allowedToSend=true;

    }

    @ViewChild('scrollableDiv', { static: true }) myDiv: ElementRef;

    scrollToBottom() {
        const divElement = this.myDiv.nativeElement;
        divElement.scrollTop = divElement.scrollHeight;
    }

allowedToSend:boolean
    send() {
        this.allowedToSend=false;
        this.scrollToBottom()
        const msgDto: MessagesDto = new MessagesDto();
        msgDto.msgFrom = this.messageFrom;
        msgDto.appAdvisorName = "Nusuk Advisor AI"
        msgDto.userName = this.userInfo.fullName
        this.messgesList.push(msgDto);
        this.messageFrom = "";
        this.gbtService.sendMsg(msgDto.msgFrom,this.threadId) .subscribe({
            next: (res: GbtMsgResp) => {
                if (res && res.chatResponse) {
                    this.threadId=res.threadId;
                    msgDto.msgTo=res.chatResponse;
                    console.log(res);
                    this.allowedToSend=true;
                }
            },
            error: (err) => {
                this.allowedToSend=true;
                console.log(err);
            },
        });
        localStorage.setItem("my chat",JSON.stringify(this.messgesList));
/*        setTimeout(() => {
            msgDto.msgTo="fghjkjhgfghjk sfsssf  sfsfsfsfsfsfsf sfsdfsfsff"
        }, 1000);*/
    }


     saveChatKey(){

     }

}
