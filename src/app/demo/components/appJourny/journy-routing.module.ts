import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JournyComponent} from "./journy.component";
import {ResultComponent} from "./result.component";
import {ChatComponent} from "./chat.component";


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: JournyComponent },
        { path: 'result', component: ResultComponent },
        { path: 'chat', component: ChatComponent }
    ])],
    exports: [RouterModule]
})
export class JournyRoutingModule { }
