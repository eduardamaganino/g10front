import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { SharedModule } from 'app/shared/shared.module';

import {MatTableModule} from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


const resultsRoutes: Route[] = [
  {
      path     : ':id',
      component: ResultsComponent
  },
];

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(resultsRoutes),
    SharedModule,
    MatTableModule,
    MatIconModule,
    
  ]
})
export class ResultsModule { }
