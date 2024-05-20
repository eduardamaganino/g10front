import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AddRespostasComponent } from './add-respostas.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { EntrevistadoRespondeComponent } from './entrevistado-responde/entrevistado-responde.component';
import { EntrevistadorRespondeComponent } from './entrevistador-responde/entrevistador-responde.component';


const respostasRoutes: Route[] = [
  {
      path     : ':id/:id/entrevistado',
      component: EntrevistadoRespondeComponent
  },
  {
    path     : ':id/:id/entrevistador',
    component: AddRespostasComponent
  },
  {
    path     : ':id/:id/entrevistador/:bloco',
    component: EntrevistadorRespondeComponent
  }
];

@NgModule({
  declarations: [
    AddRespostasComponent,
    EntrevistadorRespondeComponent,
    EntrevistadoRespondeComponent
  ],
  imports: [
    RouterModule.forChild(respostasRoutes),
    SharedModule,
    MatSelectModule
  ]
})
export class AddRespostasModule { }