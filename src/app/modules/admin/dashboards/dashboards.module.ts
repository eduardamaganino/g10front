import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

const dashboardsRoute: Route[] = [
  {
      path     : ':id',
      component: DashboardsComponent
  }
];


@NgModule({
  declarations: [
    DashboardsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardsRoute),
    NgApexchartsModule
  ],
  exports: [
    NgApexchartsModule
  ]
})
export class DashboardsModule { }
