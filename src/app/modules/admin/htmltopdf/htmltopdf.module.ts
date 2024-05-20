import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HtmltopdfComponent } from './htmltopdf.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

const resultsRoutes: Route[] = [
  {
      path     : '',
      component: HtmltopdfComponent
  },
];


@NgModule({
  declarations: [
    HtmltopdfComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(resultsRoutes),
    SharedModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class HtmltopdfModule { }
