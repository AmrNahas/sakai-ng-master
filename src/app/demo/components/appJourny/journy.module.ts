import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StyleClassModule} from 'primeng/styleclass';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputDemoRoutingModule} from "../uikit/input/inputdemo-routing.module";
import {CalendarModule} from "primeng/calendar";
import {ChipsModule} from "primeng/chips";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {ColorPickerModule} from "primeng/colorpicker";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {MultiSelectModule} from "primeng/multiselect";
import {ToggleButtonModule} from "primeng/togglebutton";
import {SliderModule} from "primeng/slider";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {ChipModule} from "primeng/chip";
import {KnobModule} from "primeng/knob";
import {InputSwitchModule} from "primeng/inputswitch";
import {ListboxModule} from "primeng/listbox";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {JournyComponent} from "./journy.component";
import {JournyRoutingModule} from "./journy-routing.module";
import {JourneyPlannerSrvcService} from "./journeyPlannerSrvc.service";
import {SpinnerModule} from "primeng/spinner";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ResultComponent} from "./result.component";
import {DataServiceSrvc} from "./data-service-srvc.service";
import {ChatComponent} from "./chat.component";
import {FieldsetModule} from "primeng/fieldset";
import {SkeletonModule} from "primeng/skeleton";
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
    imports: [
        CommonModule,
        JournyRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        AutoCompleteModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        FormsModule,
        InputDemoRoutingModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        ColorPickerModule,
        CascadeSelectModule,
        MultiSelectModule,
        ToggleButtonModule,
        SliderModule,
        InputTextareaModule,
        RadioButtonModule,
        InputTextModule,
        RatingModule,
        ChipModule,
        KnobModule,
        InputSwitchModule,
        ListboxModule,
        SelectButtonModule,
        CheckboxModule,
        ButtonModule,
        RippleModule,
        SpinnerModule,
        ProgressSpinnerModule,
        FieldsetModule,
        SkeletonModule,
        TimelineModule,
        CardModule,
        TooltipModule

    ],
    declarations: [JournyComponent,ResultComponent,ChatComponent],
    providers:[JourneyPlannerSrvcService,DataServiceSrvc]
})
export class LandingModule { }
