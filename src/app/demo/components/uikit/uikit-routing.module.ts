import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([


        { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
