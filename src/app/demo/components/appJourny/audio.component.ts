import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {JourneyPlannerSrvcService} from "./journeyPlannerSrvc.service";
import {DataServiceSrvc} from "./data-service-srvc.service";
import {MessagesDto} from "./messagesDto";
import {GbtService} from "./gbt.service";
import {GbtMsgResp} from "./gbtMsgResp";
import {AuthServiceService} from "../auth/login/authService.service";
import {AudioRecordingService} from "./AudioRecordingService";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.componet.scss']
})
export class AudioComponent {

    threadId: string = '';
    isRecording = false;
    recordedTime;
    blobUrl;
    teste;
    messageFrom: any;
    messgesList: Array<MessagesDto>;

    constructor(private audioRecordingService: AudioRecordingService,
                private sanitizer: DomSanitizer,
                public authSrvc: AuthServiceService,
                public layoutService: LayoutService, public router: Router,
                public service: JourneyPlannerSrvcService,
                private data: DataServiceSrvc, public gbtService: GbtService) {

            this.audioRecordingService
                .recordingFailed()
                .subscribe(() => (this.isRecording = false));
            this.audioRecordingService
                .getRecordedTime()
                .subscribe(time => (this.recordedTime = time));
            this.audioRecordingService.getRecordedBlob().subscribe(data => {
                this.teste = data;
                this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
                    URL.createObjectURL(data.blob)
                );
            });
        }

    startRecording() {
        if (!this.isRecording) {
            this.isRecording = true;
            this.audioRecordingService.startRecording();
        }
    }

    abortRecording() {
        if (this.isRecording) {
            this.isRecording = false;
            this.audioRecordingService.abortRecording();
        }
    }

    stopRecording() {
        if (this.isRecording) {
            this.audioRecordingService.stopRecording();
            this.isRecording = false;
        }
    }

    clearRecordedData() {
        this.blobUrl = null;
    }

    ngOnDestroy(): void {
        this.abortRecording();
    }

    download(): void {
        const url = window.URL.createObjectURL(this.teste.blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = this.teste.title;
        link.click();
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

    }

    @ViewChild('scrollableDiv', {static: true}) myDiv: ElementRef;

    scrollToBottom() {
        const divElement = this.myDiv.nativeElement;
        divElement.scrollTop = divElement.scrollHeight;
    }

    allowedToSend: boolean
    audio: string;
      msgDto: MessagesDto = new MessagesDto();
    send() {
        this.allowedToSend = false;
        this.scrollToBottom()
          this.msgDto  = new MessagesDto();
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
        this.audio=null;
        this.gbtService.textToAudio(msg, this.threadId).subscribe({
            next: (res: string) => {
                if (res) {
                    console.log(res)
                    this.msgDto.audioMsg="data:audio/ogg;base64," + res;
                }
            },
            error: (err) => {
                this.allowedToSend = true;
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
