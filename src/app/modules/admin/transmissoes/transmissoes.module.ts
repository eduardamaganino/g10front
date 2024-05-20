import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransmissoesComponent } from './transmissoes.component';
import { Route, RouterModule } from '@angular/router';

import { EditTransmissoesComponent } from './edit-transmissoes/edit-transmissoes.component';
import { SharedModule } from 'app/shared/shared.module';
import { CreateTransmissoesComponent } from './create-transmissoes/create-transmissoes.component';

const transmissaoRoutes: Route[] = [
  {
      path     : ':id',
      component: TransmissoesComponent
  },
  {
      path     : ':id/edit',
      component: EditTransmissoesComponent
  },
  {
    path     : 'create/:id',
    component: CreateTransmissoesComponent
}
];

@NgModule({
  declarations: [
    TransmissoesComponent,
    CreateTransmissoesComponent,
    EditTransmissoesComponent,
  ],
  imports: [
    RouterModule.forChild(transmissaoRoutes),
    SharedModule,
  ]
})
export class TransmissoesModule { }
