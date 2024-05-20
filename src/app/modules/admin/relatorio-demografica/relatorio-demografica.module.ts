import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RelatorioDemograficaComponent } from './relatorio-demografica.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';



const resultsRoutes: Route[] = [
  {
      path     : ':id/:modelo',
      component: RelatorioDemograficaComponent
  },
];


@NgModule({
  declarations: [
    RelatorioDemograficaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(resultsRoutes),
    SharedModule,
    MatTableModule,
    MatIconModule,
    NgApexchartsModule
  ],
  exports: [
    NgApexchartsModule
  ]
})
export class RelatorioDemograficaModule { }
