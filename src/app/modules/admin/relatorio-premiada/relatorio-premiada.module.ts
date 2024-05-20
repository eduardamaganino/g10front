import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioPremiadaComponent } from './relatorio-premiada.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';



const resultsRoutes: Route[] = [
  {
      path     : ':id/:colocado',
      component: RelatorioPremiadaComponent
  },
];

@NgModule({
  declarations: [
    RelatorioPremiadaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(resultsRoutes),
    SharedModule,
  ]
})
export class RelatorioPremiadaModule { }
