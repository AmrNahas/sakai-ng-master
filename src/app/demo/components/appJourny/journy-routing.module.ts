import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JournyComponent} from "./journy.component";


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: JournyComponent }
    ])],
    exports: [RouterModule]
})
export class JournyRoutingModule { }
