import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AuthServiceService} from "./authService.service";
import {Message, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
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
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    username: string;

    constructor(public layoutService: LayoutService, public authSrvc: AuthServiceService, private messageService: MessageService, public router: Router) {
    }

    ngOtpInput: any;
    checkOtpLength: boolean = false;

    onOtpChange(otp: any) {
        this.ngOtpInput = otp;
        if (this.ngOtpInput.length == 4) {
            this.checkOtpLength = true;
        }
    }


    verify() {
        if (this.ngOtpInput == "4217" || this.ngOtpInput == "9868" || this.ngOtpInput == "9002" || this.ngOtpInput == "9462" || this.ngOtpInput == "6578") {
            this.ngOtpInput='';
            this.router.navigate(["/landing"]);
        } else {
            this.showErrorViaMessages("Wrong Otp ")
        }
    }


    login() {
        if (!this.username || !this.password) {
            this.showErrorViaMessages("please enter the required data ")
        } else
            this.authSrvc.login(this.username, this.password)
                .subscribe({
                    next: (res: any) => {
                        if (res) {
                            localStorage.setItem("user", JSON.stringify(res));
                            this.showDialog()
                        }
                    },
                    error: (err) => {
                        this.showErrorViaMessages("Failed Login")
                    },
                });
    }
    showDialog() {
        this.visible = true;
    }

    msgs: Message[] = [];
    visible: boolean;

    showSuccessViaMessages(msg: string) {
        this.messageService.add({severity: 'success', summary: 'Success  ', detail: msg});
    }

    showErrorViaMessages(msg: string) {
        this.messageService.add({severity: 'error', summary: 'Error  ', detail: msg});

    }
}
