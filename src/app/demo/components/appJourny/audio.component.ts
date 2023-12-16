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
import {au} from "@fullcalendar/core/internal-common";

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
            console.log(data)
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


      blobToFile(blob: Blob, fileName: string): File {
        const file = new File([blob], fileName, { type: 'mp3' });
        return file;
    }

    sendAudio() {
        console.log(this.teste)
        const file =     this.blobToFile(this.teste,this.teste.title);
        console.log(file)
        this.allowedToSend = false;
        this.scrollToBottom()
        this.msgDto = new MessagesDto();
        this.msgDto.msgFrom = this.messageFrom;
        this.msgDto.appAdvisorName = "Nusuk Advisor AI"
        this.msgDto.userName = this.userInfo.fullName
        console.log( this.blobUrl);
        console.log(this.teste);
        const audio =this.gbtService.audioToAudioGbt(file, this.threadId);
        console.log(audio)
        this.msgDto.audioMsgBlobFrom = this.teste;
        this.messgesList.push(this.msgDto);
        this.teste.blob=null;

        if(audio)
        this.msgDto.audioMsgBlobTo = "data:audio/ogg;base64,"+this.gbtService.audioToAudioGbt(this.msgDto.msgFrom, this.threadId);


    }

    getVideo(){
        console.log("enterd");
        this.gbtService.textToVideo("Welcom Amro Elahas in hakathon  2023",null).subscribe({
            next: (res: any) => {
                console.log("res")
                if (res) {
                    console.log(res.text);
                    this.src = res.text;
                }
            },
            error: (err) => {
                this.allowedToSend = true;
                 console.log(err);
            },
        });

        console.log("out")
    }


    readFileContent(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const base64Data = event.target.result;
                console.log(base64Data);
                resolve(base64Data);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
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
 //this.src="https://d-id-talks-prod.s3.us-west-2.amazonaws.com/auth0%7C657d5fd688c5a1a2857188bf/tlk_7cGDYVisadr8E2qragBkO/1702716812101.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1702803214&Signature=Aqn%2FFb9tRcVsO5oLUt2KytgHZiU%3D&X-Amzn-Trace-Id=Root%3D1-657d658e-41d6f53212093fb550b7a3c9%3BParent%3D57c5ec4ed85af165%3BSampled%3D1%3BLineage%3D6b931dd4%3A0"
       this.getVideo();

    }

    @ViewChild('scrollableDiv', {static: true}) myDiv: ElementRef;

    scrollToBottom() {
        const divElement = this.myDiv.nativeElement;
        divElement.scrollTop = divElement.scrollHeight;
    }

    allowedToSend: boolean
    audio: string;
    msgDto: MessagesDto = new MessagesDto();
    src: any;

    send() {
        this.allowedToSend = false;
        this.scrollToBottom()
        this.msgDto = new MessagesDto();
        this.msgDto.msgFrom = this.messageFrom;
        this.msgDto.appAdvisorName = "Nusuk Advisor AI"
        this.msgDto.userName = this.userInfo.fullName
        this.messgesList.push(this.msgDto);
        this.messageFrom = "";
        this.msgDto.audioMsgBlobFrom = this.teste.blob
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
        this.audio = null;
        this.gbtService.textToAudio(msg, this.threadId).subscribe({
            next: (res: string) => {
                if (res) {
                    console.log(res)
                    this.msgDto.audioMsg = "data:audio/ogg;base64," + res;
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
