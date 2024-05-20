import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDemograficaComponent } from './add-demografica.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { EntrevistadoDemograficaComponent } from './entrevistado-demografica/entrevistado-demografica.component';
import { EntrevistadorDemograficaComponent } from './entrevistador-demografica/entrevistador-demografica.component';

const respostasDemograficasRoutes: Route[] = [
  {
    path     : ':id/:id/:quem',
    component: AddDemograficaComponent
  },
  {
    path     : ':id/:id/entrevistador/:bloco',
    component: EntrevistadorDemograficaComponent
  }
];

@NgModule({
  declarations: [
    AddDemograficaComponent,
    EntrevistadoDemograficaComponent,
    EntrevistadorDemograficaComponent
  ],
  imports: [
    RouterModule.forChild(respostasDemograficasRoutes),
    SharedModule,
    CommonModule,
    
  ]
})
export class AddDemograficaModule { }
