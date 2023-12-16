import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AuthServiceService} from "../auth/login/authService.service";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-landing',
    providers:[ConfirmationService ],
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.componet.scss']
})
export class LandingComponent {
    userInfo: any;

    ngOnInit() {

        this.userInfo = this.authSrvc.getUserInfo();
    }


    constructor(public layoutService: LayoutService, public router: Router, public authSrvc: AuthServiceService, private confirmationService: ConfirmationService) {
    }


    goToChatAssistance() {
        if (this.userInfo)
            this.router.navigate(['/planner/chat']);
        else {
            this.showDialog();
        }

    }

    getUserName() {
        this.confirm();
    }

    logOut() {
        this.visible = false
        this.authSrvc.logout();
        this.router.navigate(['/auth/login']);
    }

    confirm() {
        this.confirmationService.confirm({
            header: 'PLease Login To Get Full Access To Our Services',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.logOut();
            },
            reject: () => {

            }
        });
    }


    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
