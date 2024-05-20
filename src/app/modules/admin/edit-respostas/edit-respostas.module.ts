import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRespostasComponent } from './edit-respostas.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';


const resultsRoutes: Route[] = [
  {
      path     : ':id',
      component: EditRespostasComponent
  },
];

@NgModule({
  declarations: [
    EditRespostasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(resultsRoutes),
    SharedModule,
  ]
})
export class EditRespostasModule { }
