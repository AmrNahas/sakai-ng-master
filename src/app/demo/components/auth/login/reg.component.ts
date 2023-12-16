import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AuthServiceService} from "./authService.service";
import {Message, MessageService} from "primeng/api";

@Component({
    selector: 'app-reg',
    providers: [MessageService],
    templateUrl: './reg.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;

        }

        .bg-gold-600 {
            background-color: #c1a580 !important;
            width: 15%;;
            border-color: #c1a580;
        }
    `]
})
export class RegComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    email: string;
    identityNum: any;
    birthDate: any;
    fullName: any;
    username: any;
    msgs: Message[] = [];

    constructor(public layoutService: LayoutService, public authSrvc: AuthServiceService,private messageService: MessageService) {
    }


    reg() {
        if (!this.fullName ||  !this.identityNum || !this.username || !this.email || !this.password) {
            console.log(">>>>>")
            this.showErrorViaMessages("Please enter All Data ")
        } else
            this.authSrvc.reg(this.fullName, this.birthDate, this.identityNum, 1, this.username, this.email, this.password)
                .subscribe({
                    next: (res: any) => {
                        if (res) {
                            this.showSuccessViaMessages("Successfully Registration");

                        }
                    },
                    error: (err) => {
                        this.showErrorViaMessages("Failed In  Registration")
                    },
                });

    }


    showSuccessViaMessages(msg: string) {
        this.messageService.add({severity: 'success', summary: 'Success  ', detail: msg });
    }

    showErrorViaMessages(msg: string) {
        this.messageService.add({severity: 'error', summary: 'Error  ', detail: msg });

    }
}
