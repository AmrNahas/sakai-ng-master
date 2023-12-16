import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegComponent} from "./reg.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegComponent }
    ])],
    exports: [RouterModule]
})
export class RegRoutingModule { }
