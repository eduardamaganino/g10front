import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FuseCardModule } from '@fuse/components/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderListComponent } from './components/header-list/header-list.component';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DonutPieComponent } from './components/donut-pie/donut-pie.component';
import { DonutPieWrapperComponent } from './components/donut-pie/donut-pie-wrapper/donut-pie-wrapper.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FuseDrawerModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        FormsModule,
        MatDividerModule,
        MatSnackBarModule,
        RouterModule,
        ChartModule,
        NgApexchartsModule,
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        FuseDrawerModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        FormsModule,
        MatDividerModule,
        MatSnackBarModule,
        FuseCardModule,
        MatPaginatorModule,
        NgxPaginationModule,
        NgIf,
        RouterModule,
        HeaderListComponent,
        MatExpansionModule,
        ChartModule,
        NgApexchartsModule,
        DonutPieComponent,
        DonutPieWrapperComponent,
        
    ],
    declarations: [
      HeaderListComponent,
      DonutPieComponent,
      DonutPieWrapperComponent
    ]
})
export class SharedModule
{
}
