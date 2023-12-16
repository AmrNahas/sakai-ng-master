import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {RegComponent} from "./reg.component";
import {RegRoutingModule} from "./reg-routing.module";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@NgModule({
    imports: [
        CommonModule,
        RegRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule
    ],
    declarations: [RegComponent],
    providers:[MessageService]
})
export class RegModule { }
